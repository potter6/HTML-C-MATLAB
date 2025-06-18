
clear;
clc;
format long g;
 global EphDat HeadODat SiteDat
EphDat =Read_N_Renix('D:\Program Files\MATLAB\work\spoint\75030891.10n');
[HeadODat,SiteDat]=read_o_rinex('D:\Program Files\MATLAB\work\spoint\75030891.10o');

%% 计算卫星在轨位置
%  pos_time=Time_MJD(2010,3,30,6,0,0);
%  SatCoord=Pos_Sat(14,pos_time);
%  R=sqrt(SatCoord.X^2+SatCoord.Y^2+SatCoord.Z^2);

%% 计算测站位置
%%  SationCoord=abs_pos_range(1,HeadODat.ApproXYZ)

abs_pos_range(1,HeadODat.ApproXYZ)

% %%%   测站近似位置  -2201196.2131  5184220.2410  2983272.3516
% ApproCoord = 
% 
%     X: -2201195.96963591
%     Y: 5184228.95588467
%     Z: 2983285.18426456
