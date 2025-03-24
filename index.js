import "./index.scss";

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll("nav > div");
  // 登录内容区域
  const loginSections = document.querySelectorAll("form > main > div");
  // 获取登录表单和输入框
  const loginForm = document.querySelector("form");
  const usernameInput = document.querySelector(
    ".account-login input[type='text']"
  );
  const passwordInput = document.querySelector(
    ".account-login input[type='password']"
  );
  const loginButton = document.querySelector(".account-login .btn-login");
  const rememberBtn = document.querySelector(".remember span");

  // 获取短信登录相关元素
  const smsPhoneInput = document.querySelector(".SMS-login input[type='text']");
  const smsCodeInput = document.querySelector(".SMS-login .text input");
  const smsLoginButton = document.querySelector(".SMS-login .btn-login");
  const getCodeButton = document.querySelector(".SMS-login .text span");

  // 添加一个变量来跟踪倒计时定时器
  let countdownTimer = null;

  let isRemembered = localStorage.getItem("isRemembered") === "true";

  // 初始化记住密码状态
  if (isRemembered && rememberBtn && usernameInput && passwordInput) {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername) usernameInput.value = savedUsername;
    if (savedPassword) passwordInput.value = savedPassword;
    rememberBtn.classList.add("active");
  }

  function showLoginSection(indexToShow) {
    loginSections.forEach((section, index) => {
      if (index === indexToShow) {
        section.style.opacity = "1";
        section.style.zIndex = "1";
      } else {
        section.style.opacity = "0";
        section.style.zIndex = "-1";
      }
    });
  }

  // 登录验证函数
  function validateLogin(username, password) {
    // 检查是否为空
    if (!username || !password) {
      alert("用户名和密码不能为空");
      return false;
    }

    // 检查用户名和密码是否正确
    if (username === "wufan" && password === "123456") {
      return true;
    } else {
      alert("用户名或密码不正确");
      return false;
    }
  }

  // 短信登录验证函数
  function validateSmsLogin(phone, code) {
    if (!phone || !code) {
      alert("手机号和验证码不能为空");
      return false;
    }

    if (phone === "19523658591" && code === "1234") {
      return true;
    } else {
      alert("手机号码或验证码不正确");
      return false;
    }
  }

  // 重置验证码按钮状态
  function resetCodeButton() {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    getCodeButton.innerHTML = "获取验证码";
    getCodeButton.style.pointerEvents = "auto";
  }

  // 倒计时功能
  function startCountdown(button) {
    let countdown = 60;
    button.style.pointerEvents = "none"; // 禁用按钮点击

    countdownTimer = setInterval(() => {
      countdown--;
      button.textContent = `${countdown}秒后重试`;

      if (countdown <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        button.textContent = "获取验证码";
        button.style.pointerEvents = "auto"; // 恢复按钮点击
      }
    }, 1000);
  }

  // 跳转到首页
  function redirectToHome() {
    window.location.href = "./src/home/home.html";
  }

  // 记住密码按钮点击事件
  if (rememberBtn) {
    rememberBtn.addEventListener("click", () => {
      isRemembered = !isRemembered;
      if (isRemembered) {
        // 保存当前输入的用户名和密码
        localStorage.setItem("username", usernameInput.value);
        localStorage.setItem("password", passwordInput.value);
        localStorage.setItem("isRemembered", "true");
        rememberBtn.classList.add("active");
      } else {
        // 清除保存的用户名和密码
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("isRemembered");
        rememberBtn.classList.remove("active");
      }
    });
  }

  // 在登录成功后，如果没有勾选记住密码，清除输入框内容
  function handleSuccessfulLogin() {
    if (!isRemembered) {
      if (usernameInput) usernameInput.value = "";
      if (passwordInput) passwordInput.value = "";
    }
    alert("登录成功！");
    redirectToHome();
  }

  // 账号密码登录按钮点击事件
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const username = usernameInput.value;
      const password = passwordInput.value;

      if (validateLogin(username, password)) {
        handleSuccessfulLogin();
      }
    });
  }

  // 表单提交事件
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = usernameInput.value;
      const password = passwordInput.value;

      if (validateLogin(username, password)) {
        handleSuccessfulLogin();
      }
    });
  }

  // 短信登录按钮点击事件
  if (smsLoginButton) {
    smsLoginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const phone = smsPhoneInput.value.trim();
      const code = smsCodeInput.value.trim();

      if (validateSmsLogin(phone, code)) {
        alert("登录成功！");
        resetCodeButton(); // 重置验证码按钮状态
        smsCodeInput.value = ""; // 清空验证码输入框
        redirectToHome(); // 跳转到home页面
      }
    });
  }

  // 获取验证码按钮点击事件
  if (getCodeButton) {
    getCodeButton.addEventListener("click", (e) => {
      e.preventDefault();
      const phone = smsPhoneInput.value.trim();

      if (!phone) {
        alert("请输入手机号码");
        return;
      }

      if (phone === "19523658591") {
        startCountdown(getCodeButton);
      } else {
        alert("手机号码不正确");
      }
    });
  }

  // 切换登录方式
  navItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      showLoginSection(index);
    });
  });

  showLoginSection(0);
});
