;var roadmap = ( function(){
    'use strict'
    function roadmap(){
      if (roadmap.instance_) {
        return roadmap.instance_;
      }
    }
    roadmap.instance_ = this;
    roadmap.idButton = 'button_roadmap'
    roadmap.idPanel = 'roadmap_view'
    roadmap.content = `
    <H2>Hello ! that is roadmap=)</H2>
    <p>progress bar</p>
    <p>[========82%=>&nbsp;&nbsp;&nbsp;]</p>
  
    <p>📌последнее обновление: 11.02.23 : добавил роадмап.</p>
    <p>📌последнее исправление: 11.02.23 : Исправил анимацию появления панели.</p>
    <p>__________________________________________________________</p>
    <p></p>
    <p>👾start on july 2017</p>
    <p></p>
    <p>- 📌создание концепта радио, в котором кроме музыки будет место политпросвещению, на базе бесплатной платформы github</p>
    <p>- 📌Кирилл Игоревич помог создать логотип, за что ему большое, чебуреческое!</p>
    <p>- ✍️ а @MTHCKR спасибо за frontend, backend, ботов и парсеры telegram и youtube, игры и прочее</p>
    <p><h5>- Большинство моих коллег настояло на прозрачности сайта, поэтому выбрали GITHUB!</h5></p>
    <p>__________________________________________________________</p>
    <p>👾 cryptoCOVID on may 2019</p>
    <p>✍️  @MTHCKR, @jhonyE работали над JS майнером, но в последствии от этой идеи отказались. Средства предполагалось перечислять мало знаменитым левым ютуб блогерам </p>
    <p>- Евгений Олегович написал "updateGithub", "YoutubeControl", и ему так же чебуреческое, огромное=)</p>
    <p>__________________________________________________________</p>
    <p>🍌 весь 2020-22 год мы пили воду с жареных бананов b pyfrjvcndj c redness b культпросвет:3</p>
    <p>✍️  написана REDdump["00_rz_ recruitment_agent_Kwint"]</p>
    <p>🏗 переработана визуализация сайта.</p>
    <p>✍️создание системы автоматического управлением радио.</p>
    <p>__________________________________________________________</p>
    <p>______________________год_2023______________________</p>
    <p>-✍️  За 5 часов @MTHCKR переписал игру linkOfDEATH в игру Буржуй(пока тест)</p>
    <p>- 🪚Запущена и протестирована система автоматического управления сайтом</p>
    <p>-- 🪚Запущена и протестирована система автоматического парсинга новых видео YOUTUBE</p>
    <p>-- 🪚Запущена и протестирована система автоматического обновления данных в GITHUB</p>
    <p>- ✍️ Переписаны грабберы телеграмм постов: теперь все новости будут транслироваться в группу <a href="https://t.me/radiocosmopolit">https://t.me/radiocosmopolit</a> с указанием источников новостей!</p>
    <p>- 📌создан телеграмм бот <a href="https://t.me/ComraZina_bot">"https://t.me/ComraZina_bot"</a></p>
    <p>- 🏗@JhonyE добавил новостные виджеты телеграмма на сайт</p>
    c3RoM2VyNTBaSG81M3RydDZ3cmc1dDVncnNubjQzYzNSb00yVnlNM1J5ZERaM2NtYzFkRFZuY25OdWJqUXpkVzEwZVc1MFpIdW10eW50ZHo5cmRiYjQ1YmZnczY0NQ==
    <p> </p>
  `
  
    document.addEventListener('DOMContentLoaded', function(){
      let z = document.getElementById(roadmap.idPanel)
      z.innerHTML = roadmap.content;
      z.style.color = "white"
      z.style.fontFamily= '"lato", sans-serif';
    })
  
    return roadmap;
  }).call(this);
  