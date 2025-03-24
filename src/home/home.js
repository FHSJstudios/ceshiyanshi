import "../home/home.scss";
import "./home.scss";

document.addEventListener("DOMContentLoaded", () => {
  // 处理退出按钮点击
  const logoutBtn = document.querySelector(".nav-right li:last-child a");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("确定要退出登录吗？")) {
        window.location.href = "/";
      }
    });
  }

  // 处理资源下载
  const resourceBtn = document.querySelector(".nav-right li:nth-child(3) a");
  if (resourceBtn) {
    resourceBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // 创建一个 Blob 对象
      const content = "这是测试资源文件";
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

      // 创建下载链接
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "测试资源.txt";

      // 添加到文档中并触发点击
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // 清理
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    });
  }

  // 处理菜单点击
  const boxes = document.querySelectorAll(
    ".box1, .box2, .box3, .box4, .box5, .box6, .box7, .box8"
  );
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      // 获取功能标题
      let title = "功能页面";
      if (box.classList.contains("box1")) title = "档案编制功能";
      if (box.classList.contains("box2")) title = "档案收集功能";
      if (box.classList.contains("box3")) title = "统计检索功能";
      if (box.classList.contains("box4")) title = "纸质借阅功能";
      if (box.classList.contains("box5")) title = "电子借阅功能";
      if (box.classList.contains("box6")) title = "数据互导功能";
      if (box.classList.contains("box7")) title = "汇总统计功能";
      if (box.classList.contains("box8")) title = "数字档案功能";

      // 创建新页面
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${title}</title>
                    <style>
                        @keyframes gradientBG {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }

                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(-20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        @keyframes thinking {
                            0% { content: ''; }
                            25% { content: '.'; }
                            50% { content: '..'; }
                            75% { content: '...'; }
                            100% { content: ''; }
                        }

                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body { 
                            display: flex; 
                            justify-content: center; 
                            align-items: center; 
                            min-height: 100vh; 
                            margin: 0;
                            font-family: "Microsoft YaHei", sans-serif;
                            background: linear-gradient(-45deg, #E0FFFF, #B0E0E6, #87CEEB, #00BFFF);
                            background-size: 400% 400%;
                            animation: gradientBG 15s ease infinite;
                            text-align: center;
                        }

                        .message {
                            text-align: center;
                            padding: 4rem;
                            background: rgba(255, 255, 255, 0.92);
                            backdrop-filter: blur(10px);
                            border-radius: 20px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                            animation: fadeIn 0.8s ease-out;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            max-width: 90%;
                            width: 500px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }

                        h1 { 
                            color: #1E90FF;
                            margin-bottom: 2rem;
                            font-size: 2.8rem;
                            font-weight: 600;
                            position: relative;
                            padding-bottom: 1.5rem;
                            text-align: center;
                            width: 100%;
                        }

                        h1::after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 80px;
                            height: 4px;
                            background: linear-gradient(90deg, #87CEEB, #00BFFF);
                            border-radius: 2px;
                        }

                        p { 
                            color: #4682B4;
                            font-size: 1.4rem;
                            line-height: 1.8;
                            margin: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 10px;
                            text-align: center;
                            width: 100%;
                            height: 32px;
                        }

                        .thinking-dots {
                            display: inline-flex;
                            align-items: center;
                            height: 100%;
                            position: relative;
                            margin-left: 5px;
                        }

                        .thinking-dots::after {
                            content: '';
                            animation: thinking 1.5s infinite;
                            font-size: 1.4rem;
                            line-height: 1.8;
                            position: absolute;
                            left: 0;
                            bottom: 2px;
                        }

                        .icon {
                            position: relative;
                            width: 80px;
                            height: 80px;
                            margin-bottom: 2rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .icon .circle {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            border: 4px solid transparent;
                            border-radius: 50%;
                            animation: rotate 2s linear infinite;
                        }

                        .icon .circle:nth-child(1) {
                            border-top-color: #87CEEB;
                            animation-duration: 1s;
                        }

                        .icon .circle:nth-child(2) {
                            border-right-color: #00BFFF;
                            animation-duration: 1.5s;
                        }

                        .icon .circle:nth-child(3) {
                            border-bottom-color: #1E90FF;
                            animation-duration: 2s;
                        }

                        .icon .dot {
                            position: relative;
                            width: 15px;
                            height: 15px;
                            background: #87CEEB;
                            border-radius: 50%;
                            animation: pulse 1.5s ease-in-out infinite;
                        }

                        @keyframes rotate {
                            from {
                                transform: rotate(0deg);
                            }
                            to {
                                transform: rotate(360deg);
                            }
                        }

                        @keyframes pulse {
                            0%, 100% {
                                transform: scale(0.8);
                                background: #87CEEB;
                            }
                            50% {
                                transform: scale(1.2);
                                background: #00BFFF;
                            }
                        }
                    </style>
                    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                </head>
                <body>
                    <div class="message">
                        <div class="icon">
                            <div class="circle"></div>
                            <div class="circle"></div>
                            <div class="circle"></div>
                            <div class="dot"></div>
                        </div>
                        <h1>${title}</h1>
                        <p>
                            作者正在思考中
                            <span class="thinking-dots"></span>
                        </p>
                    </div>
                </body>
                </html>
            `);
      newWindow.document.close();
    });
  });
});
