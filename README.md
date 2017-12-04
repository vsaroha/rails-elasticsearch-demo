Live demo of the app - https://streemvue.herokuapp.com/

To view elastic search response in browser visit - 
https://streemvue.herokuapp.com/page_views

To invoke the query from command line - 
https://streemvue.herokuapp.com/page_views (default parameters)

or with parameters like so
curl -X GET \
  https://streemvue.herokuapp.com/page_views \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0d290480-8f08-18f5-78d8-4e61391811a1' \
  -d '{
  "urls": [
            "http://www.smh.com.au/nsw/premier-gladys-berejiklian-announces-housing-affordability-reforms-20170601-gwi0jn.html",
            "http://www.smh.com.au/sport/tennis/an-open-letter-from-martina-navratilova-to-margaret-court-arena-20170601-gwhuyx.html",
            "http://www.news.com.au/technology/environment/trump-pulls-us-out-of-paris-climate-agreement/news-story/f5c30a07c595a10a81d67611d0515a0a",
            "http://www.news.com.au/travel/travel-updates/incidents/disruptive-passenger-grounds-flight-after-storming-cockpit/news-story/5949c1e9542df41fb89e6cdcdc16b615"
  ],
  "before": "2017-06-02",
  "after": "2017-06-01",
  "interval": "1h"
}'

