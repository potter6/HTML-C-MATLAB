#include <iostream>
using namespace std;

int main()
{
    int a = 10, b = 20, c = 30;
    int *p1, *p2, *p3;
    p1 = &a;
    p2 = &b;                
    cout << "Address of a: " << p1 << endl;
    cout << "Value of a: " << *p1 << endl;
    p3 = p1;
    p1 = p2;
    p2 = p3;
    cout << "Address of a: " << p1 << endl;
    cout << "Value of a: " << *p1 << endl;
    return 0;   
}