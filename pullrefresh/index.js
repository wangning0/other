var pullRefresh = function() {
    this.dragStart = null;
    this.init = function(refresh) {
        // 绑定一个回调
        this.Refresh = refresh;
        // 创建一个loading的动画
        this.initDom();
        // 绑定事件
        this.addEvent();
    }

    this.initDoom = function() {
        var hasLoading = document.querySelector('.loading');
        if(hasLoading) {
            hasLoading.remove();
        }
        this.loading = document.createElement('div');
        this.loading.className = 'loading';
    }

    this.addEvent = function() {
        document.addEventListener('touchStart', this.touchStart.bind(this));
        document.addEventListener('touchMove', this.touchMove.bind(this));
        document.addEventListener('touchEnd', this.touchEnd.bind(this));
    }

    this.touchStart = function(event) {
        if(this.isFreezed) {
            return;
        }

        if(document.body.scrollTop == 0) {
            var touch = event.touches[0];

            this.dragStart = touch.clientY;
        } 
    }

    this.touchMove = function(event) {
        if(this.isFreezed || this.dragStart == null) {
            return;
        }
        var touch = event.touches[0];
        this.percentage = this.dragStart - touch.clientY;
    }

    this.touchEnd = function(event) {
        if(this.isFreezed || this.dragStart == null) {
            return;
        }

        this.dragStart = null;

        if(this.percentage < 0 && Math.abs(this.percentage) > 300) {
            this.showLoading();

            this.Refresh && this.Refresh();
        }

        this.percentage = 0;
    }

    this.showLoading = function(){
        this.loading.style.display = 'block';
        var self = this;

        if (self.timer) {
            clearTimeout(self.timer);
        }
        self.timer = setTimeout(function(){
            self.timer = null;
            self.loading.style.display = 'none';
        }, 1000);
    }

    this.freeze = function() {
        this.isFreezed = 1;
    }

    this.melt = function() {
        this.isFreezed = 1;
    }
}