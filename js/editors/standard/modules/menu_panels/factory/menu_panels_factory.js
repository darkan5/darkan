function MenuPanelsFactory(){

}

MenuPanelsFactory.createPanel = function(){

    return new MenuPanelView();;
}

MenuPanelsFactory.createReportsPanel = function(){

    return new ReportMenuPanelView();;
}
