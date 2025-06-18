function SatCoord=Iter_Satcoord(satcode,Approxsite,gettime)
%compute the position of satellite with iteration based on the approximate
%coordinate of station and the time of receiving the signal
%inputs:
%          satcode: the code of satellite
%          Approxsite: the approximate coordinate of station
%          gettime: the time of receiving the signal
%Outputs:
%         SatCood: a structure including the coordinate of satellite and
%         clock error of satellite
%         SatCood.X
%         SatCood.Y
%         SatCood.Z
%         SatCood.clock_deta

global EphDat HeadODat Site

omgedot=7.292115e-5;
LightSpeed=299792458.0;

Tr=gettime;
detat0=0.075;   %¸ø³õÖµ
Ts0=Tr-detat0/3600.0/24.0;
tmpcoord1=Pos_Sat(satcode,Ts0);

Theta=omgedot*detat0;  %The earth Rotation
CosTheta=cos(Theta);
SinTheta=sin(Theta);
SatCoord.X=tmpcoord1.X*CosTheta+tmpcoord1.Y*SinTheta;
SatCoord.Y=-tmpcoord1.X*SinTheta+tmpcoord1.Y*CosTheta;
SatCoord.Z=tmpcoord1.Z;
SatCoord.clock_detat=tmpcoord1.clock_detat;

dis=sqrt((SatCoord.X-Approxsite.X)^2+(SatCoord.Y-Approxsite.Y)^2+(SatCoord.Z-Approxsite.Z)^2);
detat1=dis/LightSpeed;
Ts1=Tr-detat1/3600.0/24.0;
while (abs(detat1-detat0)>1.0e-10)
    
    Ts0=Ts1;
    detat0=detat1;
    tmpcoord1=Pos_Sat(satcode,Ts0);
    
    Theta=omgedot*detat0;   %The earth Rotation
    CosTheta=cos(Theta);
    SinTheta=sin(Theta);
    SatCoord.X=tmpcoord1.X*CosTheta+tmpcoord1.Y*SinTheta;
    SatCoord.Y=-tmpcoord1.X*SinTheta+tmpcoord1.Y*CosTheta;
    SatCoord.Z=tmpcoord1.Z;
    
    dis=sqrt((SatCoord.X-Approxsite.X)^2+(SatCoord.Y-Approxsite.Y)^2+(SatCoord.Z-Approxsite.Z)^2);
    detat1=dis/LightSpeed;
    Ts1=Tr-detat1/3600.0/24.0;	
end

tmpcoord1=Pos_Sat(satcode,Ts1);
Theta=omgedot*detat1;   %The earth Rotation
CosTheta=cos(Theta);
SinTheta=sin(Theta);
SatCoord.X=tmpcoord1.X*CosTheta+tmpcoord1.Y*SinTheta;
SatCoord.Y=-tmpcoord1.X*SinTheta+tmpcoord1.Y*CosTheta;
SatCoord.Z=tmpcoord1.Z;
SatCoord.clock_detat=tmpcoord1.clock_detat;
return