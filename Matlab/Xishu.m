% ��Ҫ��ȡ���ļ�
fileID = fopen('����&����.txt','r');

% ��Ҫд������ļ�
newFileID = fopen('newFile1.txt','w');

% �еļ�����
counter = 0;

% ѭ����ȡ�ļ���ÿһ��
while true
    line = fgetl(fileID);

    % ���ļ��������߶�ȡ�������ǿ���ʱֹͣ��ȡ
    if ~ischar(line)
        break;
    end
    
    % ���¼�����
    counter = counter + 1;
    
    % �����������10�ı���+1������1�У���11�У���21��...������ô�Ͷ�ȡ��һ�в�д�����ļ�
    if mod(counter-1, 10) == 0
        fprintf(newFileID, '%s\n', line);
    end
end

% �ر��ļ�
fclose(fileID);
fclose(newFileID);