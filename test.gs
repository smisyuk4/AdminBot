function test() {  
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
  
 
  //найти последнюю строку в таблице, а потом сформировать диапазон ячеек для загрузки 
  
   
  
  var arrayBackgrounds = admList.getRange('H3:BQ236').getBackgrounds();
  Logger.log(arrayBackgrounds);
  Logger.log(arrayBackgrounds.length);
  
  var rowDate = 1;
  var colFirstDate = 8; 
  var rowFirstName = 3;//195;  
  var colName = 6;
    
  
  var arrayDebtor = [];
  
   //старт
  for (var j=0; j<arrayBackgrounds.length; j++){
  
  
  var name = admList.getRange(rowFirstName+j, colName).getValue();
  var arrayName = name.split(" ");
  var newNameClient = arrayName[0] + ' ' + arrayName[1];  
  var countDebt = 0;  
  for (var i=0; i<62; i++){    
    var x = rowFirstName-3;
       if (arrayBackgrounds[x+j][i] == '#ff0000'){
       countDebt++;
       } else if((arrayBackgrounds[x+j][i] == '#ea9999')||(arrayBackgrounds[x+j][i] == '#e6b8af')){
         countDebt = 0;
       }
  }
  Logger.log(newNameClient + ' ' + countDebt);
  
  if (countDebt !== 0){
    arrayDebtor.push(newNameClient + ' (долг: ' + countDebt + ' шт)');
  }
 
}//финиш
  
  
  
  
  Logger.log(arrayDebtor);
}

       
       
       
       
       
       /*
            цвета в таблице:
  #ffffff - белый
  #ff0000 - красный (долг)
  #00ffff - голубой (списана тренировка за неявку)
  #ea9999 - розовый (оплата)
  #e6b8af - розовый (оплата #2)
  #00ff00 - зеленый (тренировка не отмечена на абонементе)  
  */ 
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
