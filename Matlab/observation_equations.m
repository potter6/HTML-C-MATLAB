% 观测方程
function result = observation_equations(C, A, B, L)
    Xa = A(1);
    Ya = A(2);
    Xb = B(1);
    Yb = B(2);
    Xc = C(1);
    Yc = C(2);
    
    % 观测方程
    result = [sqrt((Xc - Xa)^2 + (Yc - Ya)^2) - L(1);
              sqrt((Xb - Xc)^2 + (Yb - Yc)^2) - L(2)];
end