function [HeadODat,SiteDat]=read_o_rinex(filename)
%SYNTAX:
%        Read the O-file  with the rinex format
%Input:
%        filename: the name of file including the file path
%Output: 
%         HeadODat:store the header information of observation file
%         ObsDat: storing the observales of o-file

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%========================BEGIN PROGRAM================================%%

fp=fopen('C:\Users\liujunwu.LIUJUNWU\Desktop\liujunwu\spoint\spoint\75030891.10o','r');
if(fp==-1)
    error('error to open the '+ filename);
end

%%read the header information%%
HeadODat.interval=0.0;
HeadODat.TimeOB=0.0;
HeadODat.TimeOE=0.0;

while(1)
    strTemp=fgets(fp);
    if(strTemp==-1)
        break;
    end
    
    if(length(strTemp)<80) 
        strTemp(length(strTemp)+1:80)='x';
    end
    
    if(strTemp(61:73)=='END OF HEADER')
        break;
        
    elseif(strTemp(61:79)=='APPROX POSITION XYZ')
        Temp=sscanf(strTemp,'%f%f%f');
        HeadODat.ApproXYZ.X=Temp(1);
        HeadODat.ApproXYZ.Y=Temp(2);
        HeadODat.ApproXYZ.Z=Temp(3);
        
    elseif(strTemp(61:68)=='INTERVAL')
        HeadODat.interval=sscanf(strTemp,'%f');
        
    elseif(strTemp(61:80)=='ANTENNA: DELTA H/E/N')
        Temp=sscanf(strTemp,'%f%f%f');
        HeadODat.Ant_H=Temp(1);
        HeadODat.Ant_E=Temp(2);
        HeadODat.Ant_N=Temp(3);
        
    elseif(strTemp(61:77)=='TIME OF FIRST OBS')
        Temp=sscanf(strTemp,'%d%d%d%d%d%f');
        HeadODat.TimeOB=Time_MJD(Temp(1),Temp(2),Temp(3),Temp(4),Temp(5),Temp(6));
        
    elseif(strTemp(61:76)=='TIME OF LAST OBS')
        Temp=sscanf(strTemp,'%d%d%d%d%d%f');
        HeadODat.TimeOE=Time_MJD(Temp(1),Temp(2),Temp(3),Temp(4),Temp(5),Temp(6));
        
    elseif(strTemp(61:71)=='MARKER NAME')
        HeadODat.SiteName=strTemp(1:10);
        HeadODat.SiteName=deblank(HeadODat.SiteName);
    elseif(strTemp(65:79)=='TYPES OF OBSERV')
        HeadODat.SumOType=str2num(strTemp(6));
        for k=1:HeadODat.SumOType
           
            kk=11+(k-1)*6;
            if (strTemp(kk:kk+1)=='L1')   %1-L1;2-L2;3-C1;4-P1;5-P2;6-D1;7-D2;
                HeadODat.TypeOO(k)=1;
            elseif ((strTemp(kk:kk+1)=='L2'))
                HeadODat.TypeOO(k)=2;
            elseif ((strTemp(kk:kk+1)=='C1'))
                HeadODat.TypeOO(k)=3;
            elseif ((strTemp(kk:kk+1)=='P1'))
                HeadODat.TypeOO(k)=4;
            elseif ((strTemp(kk:kk+1)=='P2'))
                HeadODat.TypeOO(k)=5;
            elseif ((strTemp(kk:kk+1)=='D1'))
                HeadODat.TypeOO(k)=6;
            elseif ((strTemp(kk:kk+1)=='D2'))
                HeadODat.TypeOO(k)=7;
            end
        end
    end  
end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%begin to read observables%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
num_obs=1;

Before_Epoch=0.0;
Next_Epoch=0.0;
while(1)
    strTemp=fgets(fp);
    if(strTemp==-1)
        break;
    elseif(isempty(str2num(strTemp(1:20))))
        break;
    end
    
    strTemp(find(strTemp=='G'))=' ';
    Temp=sscanf(strTemp(1:32),'%d%d%d%d%d%f%d%d');
    if(length(Temp)~=8)
        break;
    end
    if(Temp(1)>80)
        Temp(1)=Temp(1)+1900;
    else
        Temp(1)=Temp(1)+2000;
    end
    
    ObsDat(num_obs).TimeOEpp(1)=Time_MJD(Temp(1),Temp(2),Temp(3),Temp(4),Temp(5),Temp(6));
    ObsDat(num_obs).SatSum=Temp(8);
    
    if(Before_Epoch==0)        %when read the first epoch
        Before_Epoch=ObsDat(num_obs).TimeOEpp(1);
        if(HeadODat.TimeOB==0) %no start-time at the header information
            HeadODat.TimeOB=Before_Epoch;
        end
    elseif(Next_Epoch==0)        %when read the second epoch
        Next_Epoch=ObsDat(num_obs).TimeOEpp(1);
        if(HeadODat.interval==0) %calculate the interval when there isnot interval in header information
            HeadODat.interval=(Next_Epoch-Before_Epoch)*24*3600;
        end	
    else   %%no first and second epoch%%
        Before_Epoch=Next_Epoch;         %%the last epoch%%
        Next_Epoch=ObsDat(num_obs).TimeOEpp(1);  
        
        if((Next_Epoch-Before_Epoch)*24*3600-HeadODat.interval>0.01) %%indicates that interrupt exists%%
            %%insert the interrupt epochs%%
            detaepoch=fix((Next_Epoch-Before_Epoch)*24*3600/HeadODat.interval+0.001)-1;
            ObsDat(num_obs+detaepoch)=ObsDat(num_obs);
            for i=1:detaepoch
               ObsDat(num_obs).TimeOEpp=ObsDat(num_obs-1).TimeOEpp+HeadODat.interval/86400;
               ObsDat(num_obs).SatSum=0;ObsDat(num_obs).SatCode=[];
               num_obs=num_obs+1;
            end
        end
    end
    
    if(length(strTemp)<69)
        DetaT=0.0;
    else
        DetaT=str2num(strTemp(69:end));  %%receiver clock error 
        if(isempty(DetaT)) DetaT=0.0;end;
    end
	ObsDat(num_obs).TimeOEpp(1)=ObsDat(num_obs).TimeOEpp(1)-DetaT/24.0/3600.0; 
	
    for i=1:ObsDat(num_obs).SatSum  %%read the satellite number
        ii=30+3*i;
		ObsDat(num_obs).SatCode(i)=str2num(strTemp(ii:ii+2));	
    end
    
    if (HeadODat.SumOType>5)  %%the different observables are storeed in the two lines when the number of observation type is greater than 5
        for i=1:ObsDat(num_obs).SatSum
            strTemp=fgets(fp);
            if(length(strTemp)<80) strTemp=[strTemp blanks(80-length(strTemp))]; end;
            strTemp1=fgets(fp);
            if(length(strTemp1)<80) strTemp1=[strTemp1 blanks(80-length(strTemp1))]; end;
            strTemp=[strTemp strTemp1];
            Temp=read_epoch_obs(HeadODat.SumOType,HeadODat.TypeOO,strTemp,DetaT); %%assign the observables into corresponding variables 
            ObsDat(num_obs).FreqL1(i)=Temp(1);
            ObsDat(num_obs).FreqL2(i)=Temp(2);
            ObsDat(num_obs).RangeC1(i)=Temp(3);
            ObsDat(num_obs).RangeP1(i)=Temp(4);
            ObsDat(num_obs).RangeP2(i)=Temp(5);
        end
    else
        for i=1:ObsDat(num_obs).SatSum  
            strTemp=fgets(fp);
            if(length(strTemp)<80) strTemp=[strTemp blanks(80-length(strTemp))]; end;
            Temp=read_epoch_obs(HeadODat.SumOType,HeadODat.TypeOO,strTemp,DetaT);  
            ObsDat(num_obs).FreqL1(i)=Temp(1);
            ObsDat(num_obs).FreqL2(i)=Temp(2);
            ObsDat(num_obs).RangeC1(i)=Temp(3);
            ObsDat(num_obs).RangeP1(i)=Temp(4);
            ObsDat(num_obs).RangeP2(i)=Temp(5);
        end
    end

    %%check the end-time%%
    if(HeadODat.TimeOE~=ObsDat(num_obs).TimeOEpp(1)) 
        HeadODat.TimeOE=ObsDat(num_obs).TimeOEpp(1);
    end
    
    num_obs=num_obs+1
end
SiteDat.ObsDat=ObsDat;

fclose(fp);

return;
%%===========================END PROGRAM===========================%%