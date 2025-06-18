% 读取文本文件内容
filename = '扫描1.asc';
fileContent = fileread(filename);

% 替换箭头及其两边的空格为普通空格
newContent = regexprep(fileContent, '	*', ' ');
%newContent = regexprep(fileContent, ' ', ',');

% 将替换后的内容写入新的文本文件
newFilename = 'modified.txt';
fid = fopen(newFilename, 'w');
fwrite(fid, newContent);
fclose(fid);
