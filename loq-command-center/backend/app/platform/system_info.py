from __future__ import annotations

import platform
import socket
import time
from datetime import datetime, timezone
from typing import Any

import psutil


def collect_system_snapshot() -> dict[str, Any]:
    boot = psutil.boot_time()
    uptime_sec = time.time() - boot
    mem = psutil.virtual_memory()
    disks = []
    for part in psutil.disk_partitions(all=False):
        if part.fstype and "cdrom" not in part.opts.lower():
            try:
                usage = psutil.disk_usage(part.mountpoint)
                disks.append(
                    {
                        "device": part.device,
                        "mountpoint": part.mountpoint,
                        "fstype": part.fstype,
                        "total_gb": round(usage.total / (1024**3), 2),
                        "used_gb": round(usage.used / (1024**3), 2),
                        "free_gb": round(usage.free / (1024**3), 2),
                        "percent": usage.percent,
                    }
                )
            except (PermissionError, OSError):
                continue

    battery = None
    if hasattr(psutil, "sensors_battery"):
        bat = psutil.sensors_battery()
        if bat is not None:
            battery = {
                "percent": bat.percent,
                "secsleft": bat.secsleft,
                "power_plugged": bat.power_plugged,
            }

    net_if = []
    try:
        addrs = psutil.net_if_addrs()
        stats = psutil.net_if_stats()
        for name, addr_list in addrs.items():
            st = stats.get(name)
            net_if.append(
                {
                    "name": name,
                    "is_up": st.isup if st else None,
                    "speed_mbps": st.speed if st else None,
                    "addresses": [
                        {"family": str(a.family), "address": a.address}
                        for a in addr_list
                        if a.family == socket.AF_INET or str(a.family) == "AddressFamily.AF_INET6"
                    ],
                }
            )
    except (PermissionError, OSError):
        net_if = []

    cpu_freq = None
    try:
        freq = psutil.cpu_freq()
        if freq:
            cpu_freq = {
                "current_mhz": round(freq.current, 1) if freq.current else None,
                "min_mhz": round(freq.min, 1) if freq.min else None,
                "max_mhz": round(freq.max, 1) if freq.max else None,
            }
    except (PermissionError, OSError):
        pass

    return {
        "hostname": socket.gethostname(),
        "platform": platform.system(),
        "platform_release": platform.release(),
        "platform_version": platform.version(),
        "machine": platform.machine(),
        "processor": platform.processor() or platform.uname().processor,
        "python_version": platform.python_version(),
        "boot_time_iso": datetime.fromtimestamp(boot, tz=timezone.utc).isoformat(),
        "uptime_sec": round(uptime_sec, 1),
        "cpu_count_logical": psutil.cpu_count(logical=True),
        "cpu_count_physical": psutil.cpu_count(logical=False),
        "cpu_freq": cpu_freq,
        "memory": {
            "total_gb": round(mem.total / (1024**3), 2),
            "available_gb": round(mem.available / (1024**3), 2),
            "used_gb": round(mem.used / (1024**3), 2),
            "percent": mem.percent,
        },
        "disks": disks,
        "battery": battery,
        "network_interfaces": net_if,
    }
