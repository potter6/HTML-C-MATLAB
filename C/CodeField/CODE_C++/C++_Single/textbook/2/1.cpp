#include <iostream>
using namespace std;
class CRectangle
{
public:
    CRectangle();
    CRectangle(int width, int height);
    ~CRectangle();
    double perimeter();
    double area();

public:
    int width;
    int height;
};
CRectangle::CRectangle()
{
    width = 10;
    height = 5;
    cout << "建立默认对象" << endl;
}
CRectangle::CRectangle(int width, int height)
{
    this->width = width;
    this->height = height;
    cout << "建立对象" << endl;
}
CRectangle::~CRectangle()
{
    cout << "撤销对象" << endl;
}
double CRectangle::perimeter()
{
    return 2 * (width + height);
}
double CRectangle::area()
{
    return width * height;
}
void main()
{
    CRectangle Rect1, Rect2(30, 20), *pRect = &Rect2;
    cout << "Rect1的周长为:" << Rect1.perimeter() << endl;
    cout << "Rect1的面积为:" << Rect1.area() << endl;
    cout << "Rect2的周长为:" << Rect2.perimeter() << endl;
    cout << "Rect2的面积为:" << Rect2.area() << endl;
    cout << "Rect2的周长为:" << pRect->perimeter() << endl;
    cout << "Rect2的面积为:" << pRect->area() << endl;
}