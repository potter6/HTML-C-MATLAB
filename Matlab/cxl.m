% 已知数据
X_old = [618443.947615925; 709744.743241804; 743014.531290749; 706418.166100662; 709003.780371549;
         654164.619030173; 649103.349827085; 652138.005447841; 699131.148023962; 652129.641156892];
Y_old = [3063380.251167450; 3147987.803654980; 3065185.364692870; 3059921.525965120; 3037826.368696210;
         3150377.980704890; 3149909.115531490; 3149078.315089700; 3148528.395711590; 3147830.810968410];

X_new = [618522.515649807; 709503.784917999; 743182.206758800; 706559.168429276; 709144.603139331;
         654274.641606536; 649209.532758166; 652246.413767534; 699274.704152327; 652237.956991306];
Y_new = [3045237.204169380; 3129465.776625360; 3047043.571606680; 3041800.113846560; 3019805.538510360;
         3131847.990957740; 3131380.871656430; 3130553.930308550; 3130010.000530090; 3129311.932925160];

% 使用非线性仿射变换模型进行计算
tform = cp2tform([X_old, Y_old], [X_new, Y_new], 'nonreflective similarity');

% 计算仿射变换后的坐标
transformed_coords = tformfwd(tform, [X_old, Y_old]);

% 计算中误差
rmse_x = sqrt(mean((transformed_coords(:, 1) - X_new).^2));
rmse_y = sqrt(mean((transformed_coords(:, 2) - Y_new).^2));

% 计算旋转角的中误差（弧度）
rotation_angle_true = atan2(Y_new - mean(Y_new), X_new - mean(X_new));
rotation_angle_estimated = atan2(transformed_coords(:, 2) - mean(transformed_coords(:, 2)), ...
    transformed_coords(:, 1) - mean(transformed_coords(:, 1)));
rmse_rotation_angle = sqrt(mean((rotation_angle_true - rotation_angle_estimated).^2));

% 计算缩放因子的中误差
scale_factor_true = sqrt((X_new - mean(X_new)).^2 + (Y_new - mean(Y_new)).^2);
scale_factor_estimated = sqrt((transformed_coords(:, 1) - mean(transformed_coords(:, 1))).^2 + ...
    (transformed_coords(:, 2) - mean(transformed_coords(:, 2))).^2);
rmse_scale_factor = sqrt(mean((scale_factor_true - scale_factor_estimated).^2));

% 输出结果
disp('Estimated Parameters:');
disp(['a: ' num2str(tform.tdata.T(1,1)) ', b: ' num2str(tform.tdata.T(1,2)) ', c: ' num2str(tform.tdata.T(1,3))]);
disp(['d: ' num2str(tform.tdata.T(2,1)) ', e: ' num2str(tform.tdata.T(2,2)) ', f: ' num2str(tform.tdata.T(2,3))]);
disp(['X中误差: ' num2str(rmse_x)]);
disp(['Y中误差: ' num2str(rmse_y)]);
disp(['旋转角中误差（弧度）: ' num2str(rmse_rotation_angle)]);
disp(['缩放因子中误差: ' num2str(rmse_scale_factor)]);


