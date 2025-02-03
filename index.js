//太空背景
        const apiKey = '2pextWjN1ecly1j0x2TtfCdb1vQHc20QcdLHVSnE';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                document.body.style.backgroundImage = `url('${data.url}')`;
            })
            .catch(error => console.error('Error fetching NASA APOD:', error));


// 获取日期和天气
function initPage() {
    displayDate();
    fetchWeather();
}

// 显示当前日期
function displayDate() {
    const dateElement = document.getElementById('date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElement.textContent = today.toLocaleDateString('en', options);
}

// 获取天气
function fetchWeather() {
    const apiKey = 'a061376bf49f3182bfa7a0d9f223c850'; // 替换为你的 API 密钥
    const city = 'Kobe'; // 替换为你的城市
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherElement = document.getElementById('weather');
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            weatherElement.textContent = `${city} | ${weather} | ${temperature}°C`;
        })
        .catch(error => {
            console.error('获取天气失败:', error);
        });
}

function updateProgressBar() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');
    const totalTasks = tasks.length;
    let completedTasks = 0;

    // 计算已完成任务的数量
    for (let task of tasks) {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            completedTasks++;
        }
    }

    // 计算进度百分比
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${progress}%`;

    console.log(`Progress Updated: ${progress}%`);
}



// 在任务状态变化时调用更新进度条
function toggleTaskCompletion(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
    // 使用 setTimeout 确保 checkbox 状态更新后再执行
    setTimeout(updateProgressBar, 0);
}
      
      


// 在删除任务时调用更新进度条
function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    // 确保进度条在任务删除后更新
    setTimeout(updateProgressBar, 10);
     
}

// 在添加任务时调用更新进度条
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const startTime = document.getElementById('startTime');
    const endTime = document.getElementById('endTime');
    const taskText = taskInput.value.trim();
    const start = formatTime(startTime.value);
    const end = formatTime(endTime.value);

    if (taskText === '' || start === '' || end === '') {
        alert('Please fill in the task and time ！');
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" onchange="toggleTaskCompletion(this)">
        <span>${taskText} (${start} - ${end})</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);

    // 清空输入框
    taskInput.value = '';
    startTime.value = '';
    endTime.value = '';

    updateProgressBar(); // 更新进度条
}


// 确保时间格式化函数存在
function formatTime(timeStr) {
    return timeStr ? timeStr : ''; // 确保不会返回 `undefined`
}


// 格式化时间
function formatTime(time) {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12; // 将 0 转换为 12
    return `${formattedHour}:${minute} ${period}`;
}


// 初始化页面
initPage();

