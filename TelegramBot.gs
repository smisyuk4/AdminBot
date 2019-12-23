function sendMessage() {
  var dotID = ''; //AdminRobot
  var chatID = ''; //Мисюк
  
  var text = encodeURIComponent('Список должников: ' + 'пока пуст ;)');
  var createLink = "https://api.telegram.org/bot" + dotID + "/sendMessage?chat_id=" + chatID + "&text=" + text;  
  Logger.log(createLink);
  var loadLink = UrlFetchApp.fetch(createLink);
}

function searchDebtor(){
  //подключение к таблице тренера "Работа"  
  var sheet = SpreadsheetApp.openById("");  
  //подключение к нужной странице
  var list = sheet.getSheetByName("Данные из календаря");  
  
  //поиск ID для загрузки данных    
  var admID = list.getRange(1, 7).getValue();   
  
  if (admID !== ""){
    //подключение к таблице администратора 
    var admSheet = SpreadsheetApp.openById(admID);
  }
  //подключение к странице тренера
  var admList = admSheet.getSheetByName("СМ");  
  
  var rowDate = 1;
  var colFirstDate = 8+1; //там где отметка №
  
  var rowFirstName = 3;  
  var colName = 6;
  
  
  //поиск крайнего правого значения для поиска в таблице
  var today = new Date()
  var todayDate = today.getDate();
  Logger.log(todayDate);
    
  var lastRow = admList.getLastRow();
  var countRow = lastRow-rowFirstName;
  Logger.log('countRow ' + countRow);
  var currentColDate = colFirstDate + (todayDate*2)-2;     
  Logger.log(currentColDate);  
  
  
  //массив клиентов-должников (Фамилия Имя - число занятий в долг)
  var arrayDebtor = [];
  var oneDebtor = [];
  
  //начало перебора таблицы  
  for (var j=0; j<countRow; j++){
  //Таня Шамрай - строка 217  
  //обрезка лишней информации с именем клиента
  var nameClient = admList.getRange(rowFirstName+j, colName).getValue();
  var arrayName = nameClient.split(" ");
  var newNameClient = arrayName[0] + ' ' + arrayName[1];   
  //Logger.log(newNameClient);
  
  var countDeb = 0;  
  
  /*
            цвета в таблице:
  #ffffff - белый
  #ff0000 - красный (долг)
  #00ffff - голубой (списана тренировка за неявку)
  #ea9999 - розовый (оплата)
  #00ff00 - зеленый (тренировка не отмечена на абонементе)  
  */  
  
  
 
  for (var i=0; i<currentColDate+1; i+=2){   
    var trainingResult = admList.getRange(rowFirstName+j, colFirstDate+i).getBackground();
    //   Logger.log(trainingResult);
     if (trainingResult == '#ff0000'){
       countDeb++;
     }
  }  
  // Logger.log(countDeb);
  
    if (countDeb != 0){
      oneDebtor = [newNameClient, countDeb];
      arrayDebtor.push(oneDebtor);
    } 
  
  
}//конец перебора таблицы
  Logger.log(arrayDebtor);
  
  
  
  
  
  
}

 
