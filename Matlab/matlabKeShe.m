% 已知点坐标
A = [0, 0];
B = [8, 10];

% 观测值
L = [6.485; 11.053];

% 初始猜测未知点C的坐标
C_guess = [5, 5];

% 最小二乘法平差
options = optimoptions('lsqnonlin', 'Display', 'iter');
C_adjusted = lsqnonlin(@(C) observation_equations(C, A, B, L), C_guess, [], [], options);

% 计算平差后的坐标
Xc = C_adjusted(1);
Yc = C_adjusted(2);

% 输出结果
disp(['C点坐标平差值：Xc = ', num2str(Xc), ', Yc = ', num2str(Yc)]);

% 计算误差
errors = L - observation_equations(C_adjusted, A, B, L);
disp('观测值误差：');
disp(errors);

% 观测方程
result = observation_equations(C_adjusted, A, B, L);
disp('观测方程结果：');
disp(result);

% 计算中误差 输出中误差
rmse = sqrt(mean(errors.^2));
disp(['中误差：', num2str(rmse)]);
