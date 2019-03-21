//处在第一层的对象必须设置icon， 其实是我懒得判断并提取首字符作为collapsed的icon
//反正加了Icon好看些，难道不是么？
//每一个key构成了导航用的URL，有点hack，管他呢～


const Nimble_Voltage = {
    key: 'voltage',
    name: 'Voltage',
    icon: 'area-chart'
};


const Nimble_Current = {
    key: 'current',
    name: 'Current',
    icon: 'dot-chart'
};

const Nimble_Energy = {
    key: 'energy',
    name: 'Energy',
    icon: 'bar-chart'
};

const Nimble_Quality = {
    key: 'quality',
    name: 'Quality',
    icon: 'line-chart'
};

const Nimble_HarmonicWave = {
    key: 'harmonicwave',
    name: 'Harmonic Wave',
    icon: 'fund'
};


const sidebarMenu = [
    Nimble_Voltage,
    Nimble_Current,
    Nimble_Energy,
    Nimble_Quality,
    Nimble_HarmonicWave,
 ];

export default sidebarMenu;
