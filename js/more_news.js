window.onload = function () {
    var items = new Vue({
        el: '#news-data',
        data: {
            // news_items: {},//返回的新闻列表数据
            pageindex: 1,
            morenewsb_items: {},
            contents: {}//返回的新闻内容
        },
        created: function () {
            var _self = this;
            var newDatas = [];

            $.ajax({
                type: "POST",
                url: "http://manager.zcxiaolian.com/message/newsnoticelist?campusid=7&pageindex=1&pagesize=10&type=109",
                success: function (datas) {
                    // newDatas = datas.data;
                    // _self.news_items = newDatas.splice(0, 4);
                    _self.morenewsb_items = datas.data;
                    // console.log(newDatas);
                    // console.log(_self.morenewsb_items);
                }
            });
        },
        methods: {
            jump: function (id, type) {
                var _self = this;
                console.log(id, type);
                $.ajax({
                    type: "POST",
                    url: 'http://manager.zcxiaolian.com/message/newsnoticedetail?id=' + id + "pageindex=" + 1,
                    // http://manager.zcxiaolian.com/message/newsnoticedetail?id=31201pageindex=1

                    // dataType: 'JSONP',
                    // jsonpCallback: 'test',
                    // headers: {
                    //     "Access-Control-Allow-Origin":"*",
                    //     "Access-Control-Allow-Headers":"X-Requested-With"
                    // },
                    success: function (datas) {
                        _self.contents = datas.data;
                        if (type === 1) {
                            location.href = "../html/details.html?id=" + id; 
                        } else if (type === 2) {
                            location.href = _self.contents.content;
                            // console.log(_self.contents.content);

                        }
                    }
                });

            },
            more: function (id, type) {
                var _self = this;
                var pageindex = this.pageindex;
                console.log('pageindex', pageindex);
                this.pageindex++;
                console.log(this.pageindex);
                console.log(id, type);
                $.ajax({
                    type: "POST",
                    url: "http://manager.zcxiaolian.com/message/newsnoticelist?campusid=7&pageindex=" + this.pageindex + "&pagesize=10&type=109",
                    success: function (datas) {
                        if (datas.data.length < 10){
                             _self.morenewsb_items = _self.morenewsb_items.concat(datas.data);
                            // $('#mores').css('display', 'none');
                            $('#mores').html('没有更多了~');
                        }else{
                            _self.morenewsb_items = _self.morenewsb_items.concat(datas.data);
                        }
                        // newDatas = datas.data;
                        // _self.news_items = newDatas.splice(0, 4);
                        
                        // console.log(newDatas);
                        // console.log(_self.morenewsb_items);
                    }
                });
            }
        }
    });
}

