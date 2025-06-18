% ��֪������
A = [0, 0];
B = [8, 10];

% �۲�ֵ
L = [6.485; 11.053];

% ��ʼ�²�δ֪��C������
C_guess = [5, 5];

% ��С���˷�ƽ��
options = optimoptions('lsqnonlin', 'Display', 'iter');
C_adjusted = lsqnonlin(@(C) observation_equations(C, A, B, L), C_guess, [], [], options);

% ����ƽ��������
Xc = C_adjusted(1);
Yc = C_adjusted(2);

% ������
disp(['C������ƽ��ֵ��Xc = ', num2str(Xc), ', Yc = ', num2str(Yc)]);

% �������
errors = L - observation_equations(C_adjusted, A, B, L);
disp('�۲�ֵ��');
disp(errors);

% �۲ⷽ��
result = observation_equations(C_adjusted, A, B, L);
disp('�۲ⷽ�̽����');
disp(result);

% ��������� ��������
rmse = sqrt(mean(errors.^2));
disp(['����', num2str(rmse)]);
