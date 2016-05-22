/**
 * Created by Tejaswi Rana on 5/22/16.
 */


//Filter epochToDate :
//Use for convert epoch date format to default date format.
//Example :
//<p>{{item.createdAt |epochToDate | date:"short"}}</p>
appControllers.filter('epochToDate', function ($filter) {
  return function (input) {
    return new Date(Date(input));
  };
});// End Filter epochToDate./**
