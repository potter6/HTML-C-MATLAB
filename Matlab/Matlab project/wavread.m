clc;clear;
%filename指要读取的文件名称， 注意引号和文件后缀
%samples指读取文件的区域，举个例子，如果文件有100个数据那么长，如果读取前一半的数据，此处应为[1,50]
%datatype指读取后文件的数据格式，如double和native
filename='D:\A My Video Music\music\cxk.wav';
[y,Fs] = audioread(filename);
samples=[1,50];
[y,Fs] = audioread(filename,samples);
y=audioread(filename)
plot(y)

%[y,Fs] = audioread(filename,dataType) 如↓
%[y,Fs] = audioread(filename,native)
%[y,Fs] = audioread(filename,double)


