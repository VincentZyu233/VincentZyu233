"""
将 JPG 图片转换为 ICO favicon
依赖库: Pillow
"""

# python 3.12.5
# pip install Pillow

from PIL import Image
import os

def convert_to_ico(input_path, output_path='favicon.ico', size=64):
    """
    将图片转换为 ICO 格式
    
    Args:
        input_path: 输入图片路径
        output_path: 输出 ICO 文件路径
        size: favicon 尺寸（默认 64x64）
    """
    try:
        # 打开图片
        img = Image.open(input_path)
        
        # 转换为 RGB（ICO 格式需要）
        if img.mode in ('RGBA', 'P'):
            # 创建白色背景
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # 调整尺寸
        img = img.resize((size, size), Image.Resampling.LANCZOS)
        
        # 保存为 ICO
        img.save(output_path, 'ICO')
        
        print(f"✅ 转换成功！")
        print(f"📁 输入: {os.path.abspath(input_path)}")
        print(f"📁 输出: {os.path.abspath(output_path)}")
        print(f"📐 尺寸: {size}x{size}")
        
    except FileNotFoundError:
        print(f"❌ 错误：文件不存在 - {input_path}")
    except Exception as e:
        print(f"❌ 转换失败: {e}")

if __name__ == '__main__':
    # 转换当前目录下的 mahiro-pfp-VincentZyu.jpg
    input_file = 'mahiro-pfp-VincentZyu.jpg'
    output_file = 'favicon.ico'
    
    if os.path.exists(input_file):
        convert_to_ico(input_file, output_file, size=64)
    else:
        print(f"❌ 找不到输入文件: {input_file}")
        print(f"📁 当前目录: {os.getcwd()}")
        print(f"📂 文件列表: {os.listdir('.')}")
