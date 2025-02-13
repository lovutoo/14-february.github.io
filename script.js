/* script.js */

document.addEventListener('DOMContentLoaded', function() {
  // --- Авторизация ---
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('login-form');
  const loginOverlay = document.getElementById('login-overlay');
  const loginError = document.getElementById('login-error');
  const correctPassword = "R%T?a9oiOodD";

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (passwordInput.value === correctPassword) {
      // Если пароль правильный – скрываем оверлей и инициализируем сайт
      loginOverlay.style.display = 'none';
      initSite();
    } else {
      loginError.style.display = 'block';
    }
  });

  // --- Инициализация сайта (сердца, параллакс, слайдер) ---
  function initSite() {
    const heartContainer = document.getElementById('heart-background');
    const hearts = [];
  
    // Задаём базовый размер ячейки для сетки (в пикселях)
    const cellSize = 50;
  
    // Вычисляем число столбцов и строк в зависимости от размеров окна
    const numCols = Math.ceil(window.innerWidth / cellSize);
    const numRows = Math.ceil(window.innerHeight / cellSize);
  
    // Создаём сердца по сетке: по одному в каждой ячейке
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const heart = document.createElement('span');
        heart.classList.add('heart', 'appear');
      
        // Вычисляем позицию центра ячейки в процентах
        let leftPercent = ((col + 0.5) / numCols) * 100;
        let topPercent = ((row + 0.5) / numRows) * 100;
      
        // Небольшое случайное смещение (±10% от размеров ячейки)
        const cellWidthPercent = 100 / numCols;
        const cellHeightPercent = 100 / numRows;
        leftPercent += (Math.random() - 0.5) * cellWidthPercent * 0.2;
        topPercent += (Math.random() - 0.5) * cellHeightPercent * 0.2;
      
        heart.style.left = leftPercent + '%';
        heart.style.top = topPercent + '%';
      
        // Задаём случайный размер сердца от 20 до 40 пикселей
        const size = 20 + Math.random() * 20;
        heart.style.fontSize = size + 'px';
      
        // Создаём внутренний элемент с символом сердца
        const heartInner = document.createElement('span');
        heartInner.classList.add('heart-inner');
        heartInner.textContent = '❤';
        heart.appendChild(heartInner);
      
        heartContainer.appendChild(heart);
        hearts.push(heart);
      
        // После завершения анимации появления изменяем класс для сохранения видимости
        heart.addEventListener('animationend', function() {
          heart.classList.remove('appear');
          heart.classList.add('appeared');
        });
      }
    }
  
    /* ==== Эффекты параллакса и наведения ==== */
  
    const threshold = 100;      // Радиус действия эффекта (в пикселях)
    const maxScale = 1.5;       // Максимальный масштаб при приближении курсора
    const repulsionMax = 20;    // Максимальное смещение (отталкивание) в пикселях
  
    // Базовый и целевой цвета для сердечка (RGB)
    const baseColor = { r: 255, g: 105, b: 180 }; // #ff69b4
    const targetColor = { r: 255, g: 20,  b: 147 }; // #ff1493
  
    function updateHeartsEffect(cursorX, cursorY) {
      hearts.forEach(heart => {
        const rect = heart.getBoundingClientRect();
        const heartCenterX = rect.left + rect.width / 2;
        const heartCenterY = rect.top + rect.height / 2;
        const dx = heartCenterX - cursorX;
        const dy = heartCenterY - cursorY;
        const distance = Math.hypot(dx, dy);
      
        let scale = 1;
        let offsetX = 0;
        let offsetY = 0;
        let intensity = 0;
      
        if (distance < threshold) {
          intensity = (threshold - distance) / threshold;
          scale = 1 + intensity * (maxScale - 1);
          let repulsion = intensity * repulsionMax;
          if (distance > 0) {
            offsetX = (dx / distance) * repulsion;
            offsetY = (dy / distance) * repulsion;
          }
        }
      
        // Применяем трансформацию: смещение и масштабирование
        heart.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      
        // Вычисляем новый цвет: при intensity = 0 – базовый цвет, при intensity = 1 – целевой цвет
        const newG = Math.round(baseColor.g - (baseColor.g - targetColor.g) * intensity);
        const newB = Math.round(baseColor.b - (baseColor.b - targetColor.b) * intensity);
        const newColor = `rgb(${baseColor.r}, ${newG}, ${newB})`;
        const heartInner = heart.querySelector('.heart-inner');
        heartInner.style.color = newColor;
      });
    }
  
    // Обработка движения мыши
    document.addEventListener('mousemove', function(e) {
      updateHeartsEffect(e.clientX, e.clientY);
    });
  
    // Обработка касаний (для мобильных устройств)
    document.addEventListener('touchmove', function(e) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateHeartsEffect(touch.clientX, touch.clientY);
      }
    });
  
    /* ==== Слайдер ==== */
  
    const slides = [
      {
        image: 'images/slide1.jpg',
        title: 'Милый вид',
        description: 'Это вид из той маленькой уютной студии на суздальском 57'
      },
      {
        image: 'images/slide2.jpg',
        title: 'Милый вид',
        description: 'О а это фоточка из москвы из отеля гамма'
      },
      {
        image: 'images/slide3.jpg',
        title: 'Измайлово',
        description: 'Это мы по приезду гуляли по сиреневуму саду, перед заселением'
      },
      {
        image: 'images/slide4.jpg',
        title: 'Мили фотка',
        description: 'Это мы в лесопарке ждали автобуса, потом кстати мы ездили сдавать кровь и тебе забанили сдачу крови'
      },
      {
        image: 'images/slide5.jpg',
        title: 'ВЫхфххфывхафхыхв',
        description: 'Не могу меня до сих пор с этой фотки выносит'
      },
      {
        image: 'images/slide6.jpg',
        title: 'Это ты должен помнить',
        description: 'Как кровать сломалась а потом загорелся мусоропровод, мы какие-то вещи быстро взяли (я помню что я взяла клаву и расческу), а ты ноут. И мы потом в пятерочку пошли и кушали онигири'
      },
      {
        image: 'images/slide7.jpg',
        title: 'Едем сдавать анализы',
        description: 'Мы тогда ездили в helix на культуры'
      },
      {
        image: 'images/slide8.jpg',
        title: 'Футболка',
        description: 'Если не путаю я ее тут только разрисовала)'
      },
      {
        image: 'images/slide9.jpg',
        title: 'Переезд',
        description: 'Это в первую неделю на ушинского)'
      },
      {
        image: 'images/slide10.jpg',
        title: 'Не помню предисторию',
        description: 'Мы вроду тут шли очено поздно с окея'
      },
      {
        image: 'images/slide11.jpg',
        title: 'Кавголово',
        description: 'Это первая наша поездка на шашлыки'
      },
      {
        image: 'images/slide12.jpg',
        title: 'Кавголово',
        description: 'Это мы домой накушались и едем'
      },
      {
        image: 'images/slide13.jpg',
        title: 'Диплом',
        description: 'Это я убежала с защиты диплома ибо я тревожилась очень сильно и мне нужно было побыть одной'
      },
      {
        image: 'images/slide14.jpg',
        title: 'Кириши',
        description: 'Это на подьезде летом к киришам)'
      },
      {
        image: 'images/slide15.jpg',
        title: 'Алые паруса',
        description: 'Это мы гуляли на алые паруса в 2023, и я говорила тогда что надо будет на лодочке их в следующем году встретить'
      },
      {
        image: 'images/slide16.jpg',
        title: 'Алые паруса',
        description: 'Караблик)'
      },
      {
        image: 'images/slide17.jpg',
        title: 'Первая поездка в кириши',
        description: 'Если точнее мы тут уже возвращаемся, мне просто лень хроно порядок было делать, это мы после пустого вагона элки сели в пустой вагон метро на Обухово'
      },
      {
        image: 'images/slide18.jpg',
        title: 'Первая поездка в кириши',
        description: 'Едем домой), эта фоточка была перерисована и была заглавной страницей в документах'
      },
      {
        image: 'images/slide19.jpg',
        title: 'Ежик)',
        description: 'Просто случайная фоточка ежика'
      },
      {
        image: 'images/slide20.jpg',
        title: 'Новое сор',
        description: 'Тут ты получил только что новое сор, у меня это было записано как твой второй др'
      },
      {
        image: 'images/slide21.jpg',
        title: 'Поход в ашан)',
        description: 'Мы вечером выбрались в ашан за хумусом хлебом вкусным и лимонадиком, и ты выступал для этой фотки как штатив)'
      },
      {
        image: 'images/slide22.jpg',
        title: 'Лесколово',
        description: 'Это поездка в Лесколово, по грибы по ягоды и посмотреть на военный радар и за одно поймать странную попутку'
      },
      {
        image: 'images/slide23.jpg',
        title: 'Вид с ушинского',
        description: 'Просто невероятно розовое небо было'
      },
      {
        image: 'images/slide24.jpg',
        title: 'Еще одна поездка в кавголово',
        description: 'Тут мы жарили шашлык из индейки)'
      },
      {
        image: 'images/slide25.jpg',
        title: 'Еще одна поездка в кавголово',
        description: 'Топаем из леса'
      },
      {
        image: 'images/slide26.jpg',
        title: 'Еще одна поездка в кавголово',
        description: 'Просто очень красиви и мило)'
      },
      {
        image: 'images/slide27.jpg',
        title: 'Еще одна поездка в кавголово',
        description: 'Так счастливо с тобой на душе тогда было рядом'
      },
      {
        image: 'images/slide28.jpg',
        title: 'Кириши',
        description: 'Это ты в моем легендарном поле и я тебе цветочки в волосы вставляла'
      },
      {
        image: 'images/slide29.jpg',
        title: 'Кириши',
        description: 'Едем домой)'
      },
      {
        image: 'images/slide30.jpg',
        title: 'Кириши',
        description: 'Просто красивое поле во время поездки'
      },
      {
        image: 'images/slide31.jpg',
        title: 'Это крайняя поездка в кузьмолово',
        description: 'Мы тут купались и вообще класно время провели, лазая по этому сумашдшему склону'
      },
      {
        image: 'images/slide32.jpg',
        title: 'Кириши',
        description: 'Ну а что написать мы тут сидим вместе в сердечке)'
      },
      {
        image: 'images/slide33.jpg',
        title: 'Реклама)',
        description: 'Рекламируешь наши походные булочки который мы каждый раз покупали)'
      },
      {
        image: 'images/slide34.jpg',
        title: 'Трансойл?',
        description: 'выхафахфыхах'
      },
      {
        image: 'images/slide35.jpg',
        title: 'Поездка из Кириш',
        description: 'Вот кстати и пустой вагон элки)'
      },
      {
        image: 'images/slide36.jpg',
        title: 'Первый раз в кузьмолово',
        description: 'Тогда было очень мили, и ты жаловался что устал топать'
      },
      {
        image: 'images/slide37.jpg',
        title: 'Первый раз в кузьмолово',
        description: 'Нашли мангал картошку и фольгу и угли и сидим пьем голду'
      },
      {
        image: 'images/slide38.jpg',
        title: 'Кириши',
        description: 'Летняя поездка, если не ошибаюсь мы тут заходили к родителям за полотенцами, а потом поехали в будогощь'
      },
      {
        image: 'images/slide39.jpg',
        title: 'Прогулка по СПб',
        description: 'Мы тогда с лешей в троем гуляли'
      },
      {
        image: 'images/slide40.jpg',
        title: 'Прогулка по СПБ',
        description: 'Забрались к петропавловке и смотрели как моржи купались с утра'
      },
      {
        image: 'images/slide41.jpg',
        title: 'Кош',
        description: 'Эта та пугливая кош у детского сада'
      },
      {
        image: 'images/slide42.jpg',
        title: 'Новый год 2024',
        description: 'Мяу'
      },
      {
        image: 'images/slide43.jpg',
        title: 'Сижу жду',
        description: 'Я тогда поехала встретиться с мамой на восстании, а ты поехал у родителей забрать что-то, и я сидела тут тебя ждала а ты уговаривал меня зайти в вестебюль метро греться (но блин так красиво было)'
      },
      {
        image: 'images/slide44.jpg',
        title: 'Метель)',
        description: 'Ты спишь а я готовлю и фоткаю метель)'
      },
      {
        image: 'images/slide45.jpg',
        title: 'Спит)',
        description: 'Ну ты когда спишь такой мили котик'
      },
      {
        image: 'images/slide46.jpg',
        title: 'Твой глазик',
        description: 'Если кто-нибудь спросит какого цвета у тебя глаза можешь скинуть эту фоточку'
      },
      {
        image: 'images/slide47.jpg',
        title: 'Хихи я подарила мякиша',
        description: 'Было очень мило наблюдать как ты его каждый раз как спишь обнимаешь'
      },
      {
        image: 'images/slide48.jpg',
        title: 'Шава)',
        description: 'Просто захотели шавы в дождик и сидим)'
      },
      {
        image: 'images/slide49.jpg',
        title: 'Крайняя поездка в кузьмолово',
        description: 'Идем и удивляемся а как тут все переделали'
      },
      {
        image: 'images/slide50.jpg',
        title: 'Крайняя поездка в кузьмолово',
        description: 'Водичка красивая'
      },
      {
        image: 'images/slide51.jpg',
        title: 'Прл прогулка',
        description: 'Уперлась в муринский парк'
      },
      {
        image: 'images/slide52.jpg',
        title: 'Глазик)',
        description: 'Хихи'
      },
      {
        image: 'images/slide53.jpg',
        title: 'Сидит рисует красиви мальчик',
        description: 'Мы тогда кухню смотрели'
      },
      {
        image: 'images/slide54.jpg',
        title: 'Писька',
        description: 'Опять рисую)'
      },
      {
        image: 'images/slide55.jpg',
        title: 'Коши',
        description: 'Мили барни нюхает попу ежика'
      },
      {
        image: 'images/slide56.jpg',
        title: 'Коши',
        description: 'Спит на спинке стула'
      },
      {
        image: 'images/slide57.jpg',
        title: 'Мой поход в магазин',
        description: 'Тут красиви'
      },
      {
        image: 'images/slide58.jpg',
        title: 'Подсолнух',
        description: 'Это мы шли и болтали и я его заметила)'
      },
      {
        image: 'images/slide59.jpg',
        title: 'Вфыъфыъаъфыжвафыаж',
        description: 'барнюх'
      },
      {
        image: 'images/slide60.jpg',
        title: 'Ежик',
        description: 'Сидит мили'
      },
      {
        image: 'images/slide61.jpg',
        title: 'Спит',
        description: 'Барнюша'
      },
      {
        image: 'images/slide62.jpg',
        title: 'Милашкински',
        description: 'Сидят стоят'
      },
      {
        image: 'images/slide63.jpg',
        title: 'Поход за сухариками',
        description: 'Цветочки'
      },
      {
        image: 'images/slide64.jpg',
        title: 'Ежик',
        description: 'Обнимаемся она не довольная'
      },
      {
        image: 'images/slide65.jpg',
        title: 'Ежик',
        description: 'Хихи'
      },
      {
        image: 'images/slide66.jpg',
        title: 'Ежик',
        description: 'А тут довольная'
      },
      {
        image: 'images/slide67.jpg',
        title: 'Барнюх',
        description: 'Сидит красиви'
      },
      {
        image: 'images/slide68.jpg',
        title: 'Кош',
        description: 'Эта кош которая у детского сада'
      },
      {
        image: 'images/slide69.jpg',
        title: 'Вид с ушинского',
        description: 'Просто красивый вид('
      },
      {
        image: 'images/slide70.jpg',
        title: 'Это мы вместе решили погулять',
        description: 'Пошли в муринский парк а тут какие-то яица драконов, мы тогда как раз закончили смотреть этот сериал ну где дейнерис'
      },
      {
        image: 'images/slide71.jpg',
        title: 'Это мы вместе решили погулять',
        description: 'Прям классно и мило было'
      },
      {
        image: 'images/slide72.jpg',
        title: 'Это мы вместе решили погулять',
        description: 'Вид бесспорно классный'
      },
      {
        image: 'images/slide73.jpg',
        title: 'Твои карточки)',
        description: 'Лю тебя дурень бубень, кстати мой хейт спич по поводу карточек был из-за зависти так что простите)'
      },
    ];
  
    let currentSlide = 0;
    const slideImage = document.getElementById('slide-image');
    const slideText  = document.getElementById('slide-text');
  
    function showSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      
      const slide = slides[currentSlide];
      slideImage.src = slide.image;
      slideText.innerHTML = `<h2>${slide.title}</h2><p>${slide.description}</p>`;
      animateHeartsBeat();
    }
  
    function animateHeartsBeat() {
      const heartInners = document.querySelectorAll('.heart-inner');
      heartInners.forEach(heartInner => {
        heartInner.classList.remove('beat');
        // Принудительный reflow для перезапуска анимации
        void heartInner.offsetWidth;
        heartInner.classList.add('beat');
      });
    }
  
    document.getElementById('prev-slide').addEventListener('click', function() {
      showSlide(currentSlide - 1);
    });
  
    document.getElementById('next-slide').addEventListener('click', function() {
      showSlide(currentSlide + 1);
    });
  
    // Обработка свайпов для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.getElementById('slider');
  
    slider.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].clientX;
    });
  
    slider.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  
    function handleSwipe() {
      const thresholdSwipe = 50;
      if (touchEndX < touchStartX - thresholdSwipe) {
        showSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + thresholdSwipe) {
        showSlide(currentSlide - 1);
      }
    }
  
    // Обработка свайпа правой кнопкой мыши (ПКМ)
    let rightSwipeStartX = 0;
    let isRightSwiping = false;
  
    slider.addEventListener('mousedown', function(e) {
      if (e.button === 2) {
        isRightSwiping = true;
        rightSwipeStartX = e.clientX;
        e.preventDefault();
      }
    });
  
    slider.addEventListener('mouseup', function(e) {
      if (isRightSwiping) {
        const rightSwipeEndX = e.clientX;
        const deltaX = rightSwipeEndX - rightSwipeStartX;
        const thresholdSwipe = 50;
        if (deltaX < -thresholdSwipe) {
          showSlide(currentSlide + 1);
        } else if (deltaX > thresholdSwipe) {
          showSlide(currentSlide - 1);
        }
        isRightSwiping = false;
      }
    });
  
    // Предотвращаем появление контекстного меню при ПКМ-свайпе
    slider.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  
    // Обработка стрелок на клавиатуре
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
      }
    });
  
    // Инициализация первого слайда
    showSlide(currentSlide);
  }
});
