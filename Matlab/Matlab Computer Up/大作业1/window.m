%% Eg 1 ��Ƶ�����ź�
ts = 0.01;
t = 0:ts:1;
A = 1.5;       % ��ֵ  
f = 2;         % Ƶ��
w = 2*pi*f;    % ��Ƶ��
phi = pi/3;    % ��ʼ��λ 
x = A*cos(w*t+phi);   % ʱ���ź�
figure
plot(t,x)
xlabel('ʱ��/s')
ylabel('ʱ���ź�x(t)')
% DFT�任��ʱ��ת����Ƶ��,������Ƶ��ͼ
[X_m,X_phi] = DFT(x,ts);