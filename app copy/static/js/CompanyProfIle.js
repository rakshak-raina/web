
(function () {
    const apikey = "Tsk_e12dfc19c0e9494c90b6cfb79117353e";
    document.addEventListener('DOMContentLoaded', () => {
        // https://financialmodelingprep.com/developer/docs
        // https://iexcloud.io/docs/api/
        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/company?token=' + apikey, getCompany
        );

        getRequest(
             'https://sandbox.iexapis.com/stable/stock/' + symbol + '/logo?token=' + apikey, getLogo
         )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/cash-flow?token=' +apikey  + '&period=quarter&last=12', getCashFlow
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/financials?token=' + apikey + '&period=quarter', getQuarterFinancials
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/financials?token=' + apikey + '&period=quarter', getAnnualFinancials
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/stats?token=' + apikey, getStats
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/news?token=' + apikey, getNews
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/peers?token=' + apikey, getPeers
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/income?token=' + apikey + '&period=quarter&last=12', getQuaterIncomeStatement
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/income?token=' + apikey + '&period=annual&last=4', getAnnualIncomeStatement
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/balance-sheet?token=' + apikey + '&period=annual&last=4', getAnnualBalanceSheet
        )

        getRequest(
            'https://sandbox.iexapis.com/stable/stock/' + symbol + '/balance-sheet?token=' + apikey + '&period=quarter&last=12', getQuaterBalanceSheet
        )


        function getCompany(responseText) {
            console.log(JSON.parse(responseText));
            var obj =JSON.parse(responseText) ;
            document.getElementById("CName").innerHTML= obj["companyName"];
            document.getElementById("Description").innerHTML= obj["description"];
            document.getElementById("tags").innerHTML="";
            var tags= obj["tags"];
            for (var i = 0; i < tags.length; i++){
                $("#tags").append('<span class="badge badge-primary">'+tags[i]+'</span>'+"<span> </span>");
            }
            document.getElementById("te_value").innerHTML= obj["employees"];
            document.getElementById("ex_value").innerHTML= obj["exchange"];
            document.getElementById("ceo_value").innerHTML= obj["CEO"];
            document.getElementById("web_value").innerHTML= obj["website"];
            document.getElementById("web_value").setAttribute("href", obj["website"]);
            
        }

        function getLogo(responseText) {
            console.log(JSON.parse(responseText));
            obj=JSON.parse(responseText) ;
            document.getElementById("logo").setAttribute("src", obj["url"]);
        }

        function getCashFlow(responseText) {
            console.log(responseText);
            var data = [];
            var obj =JSON.parse(responseText) ;
            for (var i=0;i<12;i++){
                data.push({"x":new Date(obj["cashflow"][i]["fiscalDate"]),"y":obj["cashflow"][i]["cashFlow"]})
            }
            console.log(data)
            var chart = document.getElementById("myChart");
            
            var myChart = new Chart(chart, {
                type: 'line',
                data:{
                    datasets: [{
                            data: data
                            backgroundColor: #DC143C


                        }],
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'series'
                        }]
                    }
                }
            });
        }

        function getQuarterFinancials(responseText) {
            // console.log(responseText);
        }

        function getAnnualFinancials(responseText) {
            // console.log(responseText);
        }

        function getStats(responseText) {
            // console.log(responseText);
        }

        function getNews(responseText) {
            // console.log(responseText);
        }

        function getQuaterIncomeStatement(responseText) {
            // console.log(responseText);
        }

        function getAnnualIncomeStatement(responseText) {
            // console.log(responseText);
        }

        function getAnnualBalanceSheet(responseText) {
            // console.log(responseText);
        }

        function getQuaterBalanceSheet(responseText) {
            // console.log(responseText);
        }

        function getPeers(responseText) {
            responseText = JSON.parse(responseText)
            responseText.forEach(myFunction);
            function myFunction(symbol) {
                getRequest(
                    'https://sandbox.iexapis.com/stable/stock/' + symbol + '/company?token=' + apikey, AddPeer
                );
            }
        }

        function AddPeer(responseText) {
            // console.log(responseText);
        }

        function getRequest(url, success) {
            var req = false;
            try {
                req = new XMLHttpRequest();
            } catch (e) {
                try {
                    req = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        req = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        return false;
                    }
                }
            }
            if (!req) return false;
            if (typeof success != 'function') success = function () { };

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status === 200) {
                        success(req.responseText);
                    }
                }
            }

            req.open("GET", url, true);
            req.send();
            return req.status === 200;
        }

    })
})();
console.clear();