clear;clc;
close all;
x=imread('D:\A My Video Music\picture\明日方舟\红蒂 蒂蒂.jpg');
size(x)
%disp(x)
figure('numbertitle','off','name','front')
imshow(x)
hold on
pause(1)
x1=rgb2gray(x)
figure('numbertitle','off','name','after')
imshow(x1)
size(x1)
fprintf('变换后矩阵除以前矩阵可得\n')
%result=x1./x
%result
subplot(121),imshow(x),title('原图像')
subplot(122),imshow(x1),title('变化后图像')
