# 该文件为fork出项目所使用，非fork项目请勿执行
# git@gitlab.gotin.top:frontend/gotin-event-frontend.git  pc 地址
# git@gitlab.gotin.top:frontend/gotin-event-mobile.git  mobile 地址

# 尽可能不在主分支进行合并，单独进行测试后再提交master
# git checkout master
git fetch
git remote add upstream git@gitlab.gotin.top:frontend/gotin-event-mobile.git
git fetch upstream
git merge upstream/master --no-ff
# merge后请检查提交项
