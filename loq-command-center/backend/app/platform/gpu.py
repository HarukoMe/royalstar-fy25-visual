from __future__ import annotations

from typing import Any

_nvml_initialized = False
_nvml = None


def _init_nvml():
    global _nvml_initialized, _nvml
    if _nvml_initialized:
        return _nvml is not None
    _nvml_initialized = True
    try:
        import pynvml

        pynvml.nvmlInit()
        _nvml = pynvml
        return True
    except Exception:
        _nvml = None
        return False


def shutdown_nvml() -> None:
    global _nvml_initialized, _nvml
    if _nvml and _nvml_initialized:
        try:
            _nvml.nvmlShutdown()
        except Exception:
            pass
    _nvml = None
    _nvml_initialized = False


def get_gpu_snapshot() -> dict[str, Any]:
    if not _init_nvml():
        return {"available": False, "error": "NVML unavailable (no NVIDIA driver or GPU)", "devices": []}

    pynvml = _nvml
    devices = []
    try:
        count = pynvml.nvmlDeviceGetCount()
    except Exception as e:
        return {"available": False, "error": str(e), "devices": []}

    for i in range(count):
        try:
            handle = pynvml.nvmlDeviceGetHandleByIndex(i)
            name = pynvml.nvmlDeviceGetName(handle)
            if isinstance(name, bytes):
                name = name.decode("utf-8", errors="replace")
            mem = pynvml.nvmlDeviceGetMemoryInfo(handle)
            util = pynvml.nvmlDeviceGetUtilizationRates(handle)
            temp = None
            try:
                temp = pynvml.nvmlDeviceGetTemperature(handle, pynvml.NVML_TEMPERATURE_GPU)
            except Exception:
                pass
            power = None
            try:
                power = pynvml.nvmlDeviceGetPowerUsage(handle) / 1000.0
            except Exception:
                pass
            driver = None
            try:
                driver = pynvml.nvmlSystemGetDriverVersion()
                if isinstance(driver, bytes):
                    driver = driver.decode("utf-8", errors="replace")
            except Exception:
                pass

            procs = []
            try:
                compute_procs = pynvml.nvmlDeviceGetComputeRunningProcesses(handle)
                graphics_procs = pynvml.nvmlDeviceGetGraphicsRunningProcesses(handle)
                seen_pids = set()
                for proc_list in (compute_procs, graphics_procs):
                    for p in proc_list:
                        if p.pid in seen_pids:
                            continue
                        seen_pids.add(p.pid)
                        proc_name = None
                        try:
                            import psutil

                            proc_name = psutil.Process(p.pid).name()
                        except Exception:
                            proc_name = f"pid:{p.pid}"
                        procs.append(
                            {
                                "pid": p.pid,
                                "name": proc_name,
                                "used_memory_mb": round(p.usedGpuMemory / (1024**2), 1) if p.usedGpuMemory else None,
                            }
                        )
            except Exception:
                pass

            devices.append(
                {
                    "index": i,
                    "name": name,
                    "utilization_gpu": util.gpu,
                    "utilization_memory": util.memory,
                    "memory_total_mb": round(mem.total / (1024**2), 1),
                    "memory_used_mb": round(mem.used / (1024**2), 1),
                    "memory_free_mb": round(mem.free / (1024**2), 1),
                    "temperature_c": temp,
                    "power_w": round(power, 1) if power is not None else None,
                    "driver_version": driver,
                    "processes": procs,
                }
            )
        except Exception as e:
            devices.append({"index": i, "error": str(e)})

    driver_global = None
    try:
        driver_global = pynvml.nvmlSystemGetDriverVersion()
        if isinstance(driver_global, bytes):
            driver_global = driver_global.decode("utf-8", errors="replace")
    except Exception:
        pass

    return {"available": True, "driver_version": driver_global, "devices": devices}
