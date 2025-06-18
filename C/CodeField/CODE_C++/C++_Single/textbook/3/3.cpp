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
        rect.DeflateRect(100,100);
        CPen NewPen,*pOldpen;
        NewPen.CreatePen(PS_SOLID,1,RGB(0,0,255));
        pOldpen=pDC->SelectObject(&NewBrush);
        pDC->RoundRect(rect,CPoint(200,200));
        pDC->SelectObject(pOldpen);
        pDC->SelectObject(pOldBrush);
    }