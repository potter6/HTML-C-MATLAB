close all;                       %�ر����д���
Fs=500;                      %�źŵ����Ƶ��
Tp=0.1;                      %��ȡ����
T=1/Fs;                         %ʱ��������          
count=9;                      %���ۼ�9
w=99*pi;                      %��=99*pi
Xn=0;                           %X(t)
An=1;                           %An
Gn=pi;                          %��n
N=Fs*Tp;
t=[0:T:N/Fs];                %����ʱ��

%������ź�
for n=1:1:count;
    Xn=Xn+An*sin(n*w*t+Gn);
end
%��ʾԭʼ�ź�
plot(Xn);
title('ԭʼ�ź�');

figure;
Xn=Xn/max(abs(Xn));
wn=rectwin(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('��ֵ');
title('���δ� ���ĺ�202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=triang(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('��ֵ');
title('���Ǵ� ���ĺ�202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=hann(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('��ֵ');
title('������ ���ĺ�202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=hamming(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('��ֵ');
title('������ ���ĺ�202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=blackman(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('��ֵ');
title('���������� ���ĺ�202001030214')
%���źŵ����Ƶ��fc=11*99/2=544.5 Hz
%Tcmax=0.02s 
%Ϊ�˷���������������Ƶ�׷�����Ӱ�죬
%�ݶ�����Ƶ��fs=1000,�׶�ʱ��Tp=0.06

%figure;
%Ayy=Ayy/(N/2);
%Ayy(1)=Ayy(1)/2;
%F=([1:N]-1)*Fs/N; %�����ʵ�ʵ�Ƶ��ֵ
%plot(F(1:N/2),Ayy(1:N/2));   %��ʾ������FFTģֵ���
%title('����-Ƶ������ͼ');

%figure;
%Pyy=[1:N/2];
%for i=1:N/2
 %Pyy(i)=phase(Y(i)); %������λ
 %Pyy(i)=Pyy(i)*180/pi; %����Ϊ�Ƕ�
%end;
%plot(F(1:N/2),Pyy(1:N/2));   %��ʾ��λͼ
%title('��λ-Ƶ������ͼ');

%clear;clc
%t=linspace(-pi,pi,4096); %t
%An=1;               %An
%omiga=99*pi;   %��
%Gn=1;               %��n
%Xn=0;               
%for n=1:1:9
%    Xn=Xn+An*sin(n*omiga*t+Gn);
%end
%disp(Xn)

%subplot(3,1,1)
%plot(Xn)
%title('�ź�');
%xlabel('X��');
%ylabel('Y��');

%subplot(3,1,2)

%subplot(3,1,3)



