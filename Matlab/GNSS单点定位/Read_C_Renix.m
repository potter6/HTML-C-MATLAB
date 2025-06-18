function EphDat = Read_N_Renix(filename)

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Open and Find the document in Windows method 
%[filename1,pathname1]=uigetfile('*.*N','��ȡ���ǵ��������� ');        
%fp=fopen(strcat(pathname1,filename1),'rt');
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Read the N-file with the renix format
%Input:
%        filename: the name of file including the file path
%Output: 
%        EphDat: a structure, storing the ephemeris
%	      .SatPRN;    //the Sat code
% 	      .toc;       //gpsweeksec
%         .MJDTime;   //Or GPS Time(ֻҪͳһʱ��ϵͳ���ɣ��˴��ǸĽ�������ʱ��ϵͳ)
% 	      .a0;        //different of the sat clock(second)
% 	      .a1;        //sat clock drift  (s/s)
% 	      .a2;        //the rate of the Sat clock drift(s/s^2)
% 	      .IODE;      //����������Ч��IODE=Toe -Tl;
% 	      .Crs;       //����뾶���ҵ��͸��������(m)
% 	      .DetaN;     //ƽ���˶�������
% 	      .M0;        //Toeʱ��ƽ�����
% 	      .Cuc;       //γ�ȷ������ҵ��͸��������
% 	      .e;         //���ǹ��������
% 	      .Cus;       //γ�ȷ������ҵ��͸��������
% 	      .sqrtA;     //���ǹ�����뾶����
% 	      .Toe;       //�����ο�ʱ��
% 	      .Cic;       //���������ҵ��͸��������
% 	      .OMG0;      //������ྭ
% 	      .Cis;       //���������ҵ��͸��������
% 	      .I0;        //������
% 	      .Crc;       //����뾶���ҵ��͸��������(m)
%         .omg;       //���ص�Ǿ�
% 	      .OMG0dot;   //������ྭ�仯��
% 	      .I0dot;     //�����Ǳ仯��
% 	      .ISL2;      //L2 ���ݱ�־
% 	      .GpsWn;     //GPS week number
% 	      .ISL2P;     //L2 P ���ݱ�־
%         .SatAccu;   //The accuracy of the satellite(m)
% 	      .SatHth;    //The health of the Satellite (MSB)
% 	      .Tgd;       //��Ƶ���ջ��ӳٸ�����
% 	      .IODC;      //ʱ��������Ч��

%%%%%%%%%�������磺    Read_N_Renix('D:\MATLAB6p5\work\75030891.10n')
%%%%%%%%%�������磺  ��     EphDat=Read_N_Renix('D:\MATLAB6p5\work\75030891.10n')
%%%%%%%%%�������磺    EphDat(1).toc


%Begin program
fp=fopen('C:\Users\liujunwu.LIUJUNWU\Desktop\liujunwu\1\daima\75030891.10n','r');
if(fp==-1)
    error('error to open the '+ filename);
end

%read the file header
while (1) 
    strTemp=fgets(fp);
    if(strTemp==-1)
        error('error in the header file of '+ filename);
    end
    if(length(strTemp)<73)
        strTemp(length(strTemp)+1:73)='X';
    end
    if(strTemp(61:73)=='END OF HEADER')
        break;
    end
end

%read the N file data
%read the first epoch

strTemp=fgets(fp);
EphDat(1).SatPRN=str2num(strTemp(1:2));
Year=str2num(strTemp(4:5));Mon=str2num(strTemp(7:8));
Day=str2num(strTemp(10:11));THour=str2num(strTemp(13:14));
TMin=str2num(strTemp(16:17));TSec=str2num(strTemp(19:22));

if (Year>80)  %GPS��20C80���������
    Year=Year+1900;
else
   Year=Year+2000;
end  
EphDat(1).toc=ConvertGpsTime(Year,Mon,Day,THour,TMin,TSec);             %ת����GPS����
EphDat(1).MJDTime=Time_MJD(Year,Mon,Day,THour,TMin,TSec);               %% 20101110����

EphDat(1).a0=str2num(strTemp(23:41));      %D,E��Ҫת����������������������
EphDat(1).a1=str2num(strTemp(42:60));
EphDat(1).a2=str2num(strTemp(61:79));

strTemp=fgets(fp);;     %read the second line
EphDat(1).IODE=str2num(strTemp(1:22));
EphDat(1).Crs=str2num(strTemp(23:41));
EphDat(1).DetaN=str2num(strTemp(42:60));
EphDat(1).M0=str2num(strTemp(61:79));

strTemp=fgets(fp);     %read the third line 
EphDat(1).Cuc=str2num(strTemp(1:22));
EphDat(1).e=str2num(strTemp(23:41));
EphDat(1).Cus=str2num(strTemp(42:60));
EphDat(1).sqrtA=str2num(strTemp(61:79));

strTemp=fgets(fp);    %read the fourth line
EphDat(1).Toe=str2num(strTemp(1:22));
EphDat(1).Cic=str2num(strTemp(23:41));
EphDat(1).OMG0=str2num(strTemp(42:60));
EphDat(1).Cis=str2num(strTemp(61:79));

strTemp=fgets(fp);   %read the fifth line 
EphDat(1).I0=str2num(strTemp(1:22));
EphDat(1).Crc=str2num(strTemp(23:41));
EphDat(1).omg=str2num(strTemp(42:60));
EphDat(1).OMG0dot=str2num(strTemp(61:79));

strTemp=fgets(fp);   %read the sixth line 
EphDat(1).I0dot=str2num(strTemp(1:22));
EphDat(1).ISL2=str2num(strTemp(23:41));
EphDat(1).GpsWn=str2num(strTemp(42:60));
EphDat(1).ISL2P=str2num(strTemp(61:79));

strTemp=fgets(fp);   %the seventh line
EphDat(1).SatAccu=str2num(strTemp(1:22));
EphDat(1).SatHth=str2num(strTemp(23:41));
EphDat(1).Tgd=str2num(strTemp(42:60));
EphDat(1).IODC=str2num(strTemp(61:79));  

strTemp=fgets(fp); %the eigth line

%read the other epochs
while(1)
    strTemp=fgets(fp);
    if(strTemp==-1)
        break;
    end

    TempEph.SatPRN=str2num(strTemp(1:2));
    Year=str2num(strTemp(4:5));Mon=str2num(strTemp(7:8));
    Day=str2num(strTemp(10:11));THour=str2num(strTemp(13:14));
    TMin=str2num(strTemp(16:17));TSec=str2num(strTemp(19:22));
    
    if (Year>80)  %GPS��20C80���������
        Year=Year+1900;
    else
        Year=Year+2000;
    end  
    TempEph.toc=ConvertGpsTime(Year,Mon,Day,THour,TMin,TSec);
    TempEph.MJDTime=Time_MJD(Year,Mon,Day,THour,TMin,TSec);         %% 20101110����
    
    %�ж��Ƿ����µ��������֣����û��������
    Increase=true;
    for i=1:length(EphDat)
        if(EphDat(i).SatPRN==TempEph.SatPRN)
            if(abs(TempEph.toc-EphDat(i).toc)<3600)
                Increase=false;
                break;
            end
        end
    end
    if(~Increase)
        for i=1:7  %����ʣ���7��
            fgets(fp);
        end
        continue;  % the next eph
    end
    
    TempEph.a0=str2num(strTemp(23:41));
    TempEph.a1=str2num(strTemp(42:60));
    TempEph.a2=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);;     %read the second line
    TempEph.IODE=str2num(strTemp(1:22));
    TempEph.Crs=str2num(strTemp(23:41));
    TempEph.DetaN=str2num(strTemp(42:60));
    TempEph.M0=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);     %read the third line 
    TempEph.Cuc=str2num(strTemp(1:22));
    TempEph.e=str2num(strTemp(23:41));
    TempEph.Cus=str2num(strTemp(42:60));
    TempEph.sqrtA=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);    %read the fourth line
    TempEph.Toe=str2num(strTemp(1:22));
    TempEph.Cic=str2num(strTemp(23:41));
    TempEph.OMG0=str2num(strTemp(42:60));
    TempEph.Cis=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);   %read the fifth line 
    TempEph.I0=str2num(strTemp(1:22));
    TempEph.Crc=str2num(strTemp(23:41));
    TempEph.omg=str2num(strTemp(42:60));
    TempEph.OMG0dot=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);   %read the sixth line 
    TempEph.I0dot=str2num(strTemp(1:22));
    TempEph.ISL2=str2num(strTemp(23:41));
    TempEph.GpsWn=str2num(strTemp(42:60));
    TempEph.ISL2P=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);   %the seventh line
    TempEph.SatAccu=str2num(strTemp(1:22));
    TempEph.SatHth=str2num(strTemp(23:41));
    TempEph.Tgd=str2num(strTemp(42:60));
    TempEph.IODC=str2num(strTemp(61:79));  
    
    strTemp=fgets(fp); %the eigth line
    
    num_eph=length(EphDat)+1;
    EphDat(num_eph)=TempEph;
end

fclose(fp);
return;