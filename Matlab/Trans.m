% ��ȡ�ı��ļ�����
filename = 'ɨ��1.asc';
fileContent = fileread(filename);

% �滻��ͷ�������ߵĿո�Ϊ��ͨ�ո�
newContent = regexprep(fileContent, '	*', ' ');
%newContent = regexprep(fileContent, ' ', ',');

% ���滻�������д���µ��ı��ļ�
newFilename = 'modified.txt';
fid = fopen(newFilename, 'w');
fwrite(fid, newContent);
fclose(fid);
