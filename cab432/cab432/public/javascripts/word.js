var myConfig = {
  type: 'wordcloud',
  options: {
    text: "kishan is good guy, he is handsome.",
    
    minLength: 5,
    ignore: ['And','and','about','again','already','are','as','at','before','could','for','great','had','have','how','however','in','is','it','nothing','of','on','other','so','shall','still','that','to','The','the','their','then','there','thought','until','was','were','what','When','when','which','whole','with','would','your'],
    maxItems: 100,
    token: 'word', //word is default. other option is character.
    
    colorType: 'palette',
    palette: ['#E91E63','#2196F3','#4CAF50','#FFC107','#00BCD4','#673AB7','#8BC34A'],
    
    rotate: true,
    aspect: 'spiral', //'flow-center', 'flow-top', 'spiral',
    
    
    style: {
      fontFamily: 'Arial',

      hoverState: {
        alpha: 1,
        backgroundColor: '#2196F3',
        borderRadius: 3,
        fontColor: 'white',
        textAlpha: 1,
      },
      tooltip: {
        visible: true,
        text: '%text: %hits',
        
        alpha: 0.9,
        backgroundColor: '#E91E63',
        borderColor: 'none',
        borderRadius: 3,
        fontColor: 'white',
        fontFamily: 'Courier',
        textAlpha: 1
      }
    }
  }
};

zingchart.render({ 
	id: 'myChart', 
	data: myConfig, 
	height: 300, 
	width: '100%' 
});