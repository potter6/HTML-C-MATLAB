%% Eg 1 单频正弦信号
ts = 0.01;
t = 0:ts:1;
A = 1.5;       % 幅值  
f = 2;         % 频率
w = 2*pi*f;    % 角频率
phi = pi/3;    % 初始相位 
x = A*cos(w*t+phi);   % 时域信号
figure
plot(t,x)
xlabel('时间/s')
ylabel('时域信号x(t)')
% DFT变换将时域转换到频域,并绘制频谱图
[X_m,X_phi] = DFT(x,ts);