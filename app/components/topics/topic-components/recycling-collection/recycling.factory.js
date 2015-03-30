simplicity.factory('Recycling', ['$q', '$stateParams', 'AddressCache',
  function($q, $stateParams, AddressCache){   

    var Recycling = {};

    var topicProperties = {
      'name' : 'recycling',
      'title' : 'Recycling Collection',
      'position' : 5,
      'searchby' : {
        'address' : {
          'params' : {
            'type' : null,
            'timeframe' : null,
            'extent' : null,
            'view' : 'simple'
          },
          'requiredParams' : [],
          'headerTemplate' : 'topics/topic-headers/topic.header.at.html',
        }
      },
      'simpleViewTemplate' : 'topics/topic-components/recycling-collection/recycling-collection.view.html',
      'detailsViewTemplate' : null,
      'tableViewTemplate' : null,
      'listViewTemplate' : null,
      'defaultView' : 'simple',
      'iconClass' : 'flaticon-trash42',
      'linkTopics' : ['trash', 'property'],
      'questions' : {
        'topic' : 'Do you want to know when recycling is collected?',
        'address' : 'Do you want to know when recycling is collected at this address?'
      }
    };
    
    var getCurrentRecyclingWeek = function(){
      var d = new Date(); // current time 
      var t = d.getTime() - (1000*60*60*24*3); // milliseconds since Jan 4 1970 Sunday
      var w = Math.floor(t / (1000*60*60*24*7)); // weeks since Jan 4 1970  
      var o = w % 2; // equals 0 for even (B weeks) numbered weeks, 1 for odd numbered weeks 
      if(o === 0){
        return 'B';
      }else{ // do your odd numbered week stuff 
        return 'A';
      }
    };

    Recycling.build = function(){
      var q = $q.defer();
      var addressCache = AddressCache.get();
      var recyclingArray = addressCache.recycling.split(' ');
      var currentRecyclingWeek = getCurrentRecyclingWeek();
      var recycling = {
        'recyclingDay' : addressCache.recycling,
        'searchGeojson' : addressCache.searchGeojson
      };
      if(recyclingArray[3] === 'A)'){
        if(getCurrentRecyclingWeek() === 'A'){
          recycling.recyclingSchedule = {'week' : 'A', 'when' : 'this week'};
        }else{
          recycling.recyclingSchedule = {'week' : 'A', 'when' : 'next week'};
        }
      }else{
        if(getCurrentRecyclingWeek() === 'B'){
          recycling.recyclingSchedule = {'week' : 'B', 'when' : 'this week'};
        }else{
          recycling.recyclingSchedule = {'week' : 'B', 'when' : 'next week'};
        }
      }
      q.resolve(recycling);
      return q.promise;
    };

    Recycling.getTopicProperties = function(){
      return topicProperties;
    };

    //****Return the factory object****//
    return Recycling; 

    
}]); //END Recycling factory function




   


