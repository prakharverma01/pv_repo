# pv_repo
3 portlet view Using ReatJS-Redux

The project has following feature :
1)  The first view portlet pulls news from New york times evey 10th second using TimesWire API, (the API key is also included in the project). 
    It shows the top 7, and every time a new news comes in it highlights that specific news.
2)  Second view portlet shows a set of name-message pair, along with a auto generated ID, which is added by the user, user can also update or
    delete the message of given ID, This data is stored in localStorage of HTML5, hence on refreshing the page, the name-messages added 
    remains.
3)  Third view portlet shows the bar chart of data pulled from a URL in JSON format which is demographic statistics broken down by zip code.
    user can select a zip-code from the drop down menu.
4)  Minimizing options are present in the bottm-left side, which can minimise or maximise any of the three portlets.    
