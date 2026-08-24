import subprocess
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# ssh root@xxx.xxx.xxx.xxx -p xxxxx
# tail -n 20 /var/log/nginx/error.log
# tail -f /var/log/nginx/error.log
# tail -f /var/log/nginx/access.log

# --- 切换到项目根目录 (脚本所在目录的上一级) ---
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
os.chdir(PROJECT_ROOT)
print(f"📂 工作目录: {PROJECT_ROOT}")

# --- 从 .env 加载配置 (从 py/.env 读取) ---
load_dotenv(SCRIPT_DIR / ".env")

CONFIG = {
    "remote_host": os.getenv("DEPLOY_REMOTE_HOST"),
    "remote_port": os.getenv("DEPLOY_REMOTE_PORT"),
    "remote_user": os.getenv("DEPLOY_REMOTE_USER"),
    "remote_path": os.getenv("DEPLOY_REMOTE_PATH"),
    "local_dist_dir": os.getenv("DEPLOY_LOCAL_DIST_DIR", r"docs\.vitepress\dist"),
    "zip_name": os.getenv("DEPLOY_ZIP_NAME", "dist.zip")
}

# 检查必需的环境变量
required_vars = ["remote_host", "remote_port", "remote_user", "remote_path"]
missing = [k for k in required_vars if not CONFIG[k]]
if missing:
    print(f"❌ 缺少必需的环境变量: {', '.join(missing)}")
    print("请检查 .env 文件，参考 .env.example")
    sys.exit(1)

def run_command(cmd, shell=True):
    """运行系统命令并实时打印输出"""
    print(f"执行命令: {cmd}")
    result = subprocess.run(cmd, shell=shell, text=True)
    if result.returncode != 0:
        print(f"❌ 命令执行失败，退出码: {result.returncode}")
        sys.exit(1)

def deploy():
    # 1. 编译项目
    print("🚀 正在编译 VitePress...")
    run_command("yarn docs:build")

    # 2. 打包文件
    # -tzip 指定 zip 格式，-r 递归，-y 自动确认覆盖
    print("📦 正在使用 7z 打包...")
    if os.path.exists(CONFIG["zip_name"]):
        os.remove(CONFIG["zip_name"])
    
    # 切换到 dist 目录内部打包，这样解压后不会多一层文件夹
    archive_cmd = f'7z a {CONFIG["zip_name"]} .\\{CONFIG["local_dist_dir"]}\\*'
    run_command(archive_cmd)

    # 3. 上传文件
    print("🚚 正在上传到服务器...")
    ssh_target = f"{CONFIG['remote_user']}@{CONFIG['remote_host']}"
    scp_cmd = f"scp -P {CONFIG['remote_port']} {CONFIG['zip_name']} {ssh_target}:{CONFIG['remote_path']}"
    run_command(scp_cmd)

    # 4. 远程解压并清理
    print("🔧 正在远程解压...")
    # 远程执行：进入目录 -> 解压并覆盖 -> 删除压缩包
    remote_cmd = (
        f"cd {CONFIG['remote_path']} && "
        f"unzip -o {CONFIG['zip_name']} && "
        f"rm {CONFIG['zip_name']}"
    )
    ssh_exec = f'ssh -p {CONFIG["remote_port"]} {ssh_target} "{remote_cmd}"'
    run_command(ssh_exec)

    # 5. 清理本地 zip 文件
    print("🧹 正在清理本地临时文件...")
    if os.path.exists(CONFIG["zip_name"]):
        os.remove(CONFIG["zip_name"])
        print(f"   已删除 {CONFIG['zip_name']}")

    print("\n✅ 部署完成！你的网站已更新。")

if __name__ == "__main__":
    deploy()
