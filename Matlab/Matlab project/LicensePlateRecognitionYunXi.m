clear;clc
close all;

[filename,filepath]=uigetfile(      );
openfile=strcat(filepath,filename);

X=imread(openfile);
imshow(X);

x=rgb2gray(X);
results=ocr(x);
word=results.Words{1}
wordBBox=results.WordBoundingBoxes(1,:)

% 在原图像中标出文字的大致位置
figure('numbertitle','off','name','2')
Iname=insertObjectAnnotation(x,'rectangle',wordBBox,word);
imshow(Iname);

% Find characters with low confidence
lowConfidenceIdx = results.CharacterConfidences < 0.5;
% Get the bounding box locations of the low confidence characters
lowConfBBoxes = results.CharacterBoundingBoxes(lowConfidenceIdx, :);
% Get confidence values
lowConfVal = results.CharacterConfidences(lowConfidenceIdx);
% Annotate image with character confidences
str      = sprintf('confidence = %f', lowConfVal);
Ilowconf = insertObjectAnnotation(x, 'rectangle', lowConfBBoxes, str);
figure;
imshow(Ilowconf);

fprintf('1次识别结果')
results.Text
figure('numbertitle','off','name','3')
imshow(x)

th=graythresh(x);
BW=im2bw(x,th);
figure('numbertitle','off','name','4')
imshowpair(x,BW,'montage');

Icorrected=imtophat(x,strel('disk',15));
th=graythresh(Icorrected);
BW1=im2bw(Icorrected,th);
figure('numbertitle','off','name','5')
imshowpair(Icorrected,BW1,'montage');
results = ocr(BW1, 'TextLayout', 'Block');
fprintf('5识别结果')
results.Text

marker = imerode(Icorrected, strel('line',10,0));
Iclean = imreconstruct(marker, Icorrected);
th  = graythresh(Iclean);
BW2 = im2bw(Iclean, th);
figure('numbertitle','off','name','6')
imshowpair(Iclean, BW2, 'montage');

results = ocr(BW2, 'TextLayout', 'Block');
fprintf('6识别结果')
results.Text

regularExpr='\d';
% Get bounding boxes around text that matches the regular expression
bboxes = locateText(results, regularExpr, 'UseRegexp', true);
digits = regexp(results.Text, regularExpr, 'match');
% draw boxes around the digits
Idigits = insertObjectAnnotation(x, 'rectangle', bboxes, digits);
figure('numbertitle','off','name','7')
imshow(Idigits);
% Use the 'CharacterSet' parameter to constrain OCR
results = ocr(BW2, 'CharacterSet', '0123456789', 'TextLayout','Block');
fprintf('7识别结果')
results.Text
