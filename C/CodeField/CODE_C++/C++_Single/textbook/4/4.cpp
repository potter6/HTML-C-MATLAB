void CTestView::OnDraw(CDC* pDC)
	{
		CTestDoc* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		//TODO:add draw code for native data here
		CRect rect;
		GetClientRect(&rect);
		pDC->SerMapMode(MM_ANTSOTROPIC);
		pDC->SetViewportExt(rect.Width(), rect.Height());
		pDC->SetViewportOrg(rect.Width() / 2, rect.Height() / 2);
		rect.OffsetRect(_rect.Width() / 2, -rect.Height() / 2);
        CRect.rect1(CPoint(-250,50),CPoint(250,150));
        CRect.rect2(CPoint(-250,-150),CPoint(250,-50));
        CBrush Brush(RS_BDIAGONAL,RGB(255,0,0));
        pDC->FillRect(&rect1,&Brush);
        pDC->FillSolidRect(&rect2,RGB(255,0,0));
    }