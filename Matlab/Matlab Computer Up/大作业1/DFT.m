function [f,X_m,X_phi] = DFT(xn,ts,N,drawflag)
% [f,X_m,X_phi] = DFT(xn,ts,N,drawflag) 离散序列的快速傅里叶变换，时域转换为频域
% 输入  xn为离散序列 为向量  
%       ts为序列的采样时间/s
%       N为FFT变换的点数，默认为xn的长度  
%       drawflag为绘图标识位，取0时不绘图，其余非0值时绘图，默认为绘图
% 输出 f为频率向量
%      X_m为幅值向量
%      X_phi为相位向量，单位为°
% 注意计算出来的0频分量(直流分量应该除以2)  直流分量的符号应结合相位图来确定
