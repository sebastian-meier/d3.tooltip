/*global d3:false */
/*jshint unused:false*/
function d3_tooltip( opts ){
	var selection,tip,innertip,height,
        //max width you want the tooltip to be
        options = {width:250,padding:10,border:2,fixedWidth:false,offset:{x:4,y:12}};

    if(opts){
        //Merge Defaults with options
    	for (var attrname in opts) { options[attrname] = opts[attrname]; }
    }

    var width = options.width,
        padding= options.padding,
        border= options.border,
        fixedWidth = options.fixedWidth,
        offset={
            //Half the tooltip arrow width
            x:options.offset.x || 4,
            //Size of your tooltip arrow + extra if you don't want it touch the object
            y:options.offset.y || 12
        };



	function tooltip(sel){
		selection = sel;
		tooltip.init();
	}

	tooltip.init = function(){
		selection.each(function(d, i) {
			var sel = d3.select(this);

			tip = sel.append('div')
				.attr('id', 'tooltip')
				.attr('class', 'd3-tip')
                .style("padding-left", padding+"px")
                .style("padding-right", padding+"px")
                .style("border-width", border+"px");

            if(fixedWidth){
                tip.style("width", (width-(padding+border)*2)+"px");
            }

			innertip = tip.append('div')
				.attr('id', 'tooltip-inner');

		});
	};

	tooltip.content = function(html){
		innertip.html(html);

		var visible = false;
		if(tip.style('display') === 'block'){
			visible = true;
		}
		tip.style('display','block');
		var bb = tip.node().getBoundingClientRect();
		height = bb.height;

        if(!fixedWidth){
            width = bb.width;
        }

		if(!visible){
			tip.style('display','none');
		}
	};

	tooltip.position = function(xy){
		tip.style('left', (xy[0]-width/2-offset.x)+"px")
			.style('top', (xy[1]-height-offset.y)+"px")
			.classed('right', false)
			.classed('left', false);

		if(xy[0]<width/2){
			tip.style('left', (xy[0]-(offset.x*2+border))+"px")
				.classed('left', true);
		}

		if(xy[0]>(window.innerWidth-width/2)){
			tip.style('left', (xy[0]-width+(offset.x*2))+"px")
				.classed('right', true);
		}
	};

    tooltip.positionFromObj = function(o){
        var bb = o.node().getBoundingClientRect();
        tooltip.position([bb.left+window.pageXOffset+bb.width/2, bb.top+window.pageYOffset+bb.height/2]);
	};

	tooltip.show = function(){
		tip.style('display', 'block');
	};

	tooltip.hide = function(){
		tip.style('display', 'none');
	};

	return tooltip;
}
