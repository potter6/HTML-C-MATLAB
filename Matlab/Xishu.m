% 打开要读取的文件
fileID = fopen('地面&建筑.txt','r');

% 打开要写入的新文件
newFileID = fopen('newFile1.txt','w');

% 行的计数器
counter = 0;

% 循环读取文件的每一行
while true
    line = fgetl(fileID);

    % 当文件结束或者读取到的行是空行时停止读取
    if ~ischar(line)
        break;
    end
    
    % 更新计数器
    counter = counter + 1;
    
    % 如果计数器是10的倍数+1（即第1行，第11行，第21行...），那么就读取这一行并写入新文件
    if mod(counter-1, 10) == 0
        fprintf(newFileID, '%s\n', line);
    end
end

% 关闭文件
fclose(fileID);
fclose(newFileID);