window.onload = function () {
    // details.html
    var url = location.href;
    var id = url.split("=")[1];
    console.log(id);
    var details = new Vue({
        el: "#content",
        data: {
            title: '',
            publishtime: '',
            contents: ''
        },
        created: function () {
            var _self = this;
            // console.log(event);
            $.ajax({
                type: "POST",
                url: 'http://manager.zcxiaolian.com/message/newsnoticedetail?id=' + id,
                success: function (datas) {
                    _self.contents = datas.data.content;
                    _self.title = datas.data.title;
                    _self.publishtime = datas.data.publishtime;

                }
            });
        }
    });
}
