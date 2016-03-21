# d3.tooltip
## Little Tooltip Helper for D3

![d3.tooltip thumbnail](https://raw.githubusercontent.com/sebastian-meier/d3.tooltip/master/thum)b.png

This is inspired by this block: http://bl.ocks.org/Caged/6476579 created by Justin Palmer (i just saw that it was updated earlier this year, so not sure if it is still inspired what you see at the url)

## Usage

In addition to what Justin's tooltip does, this tooltip additionally allows you to set a fixed width for your tooltip:

```
var tooltip = d3_tooltip({fixedWidth:true,width:250})
```

You can set border-width and padding (left/right) for your tooltip:

```
var tooltip = d3_tooltip({padding:10,border:2})
```

But you can also just use the default settings:

```
var tooltip = d3_tooltip();
```

Afterwards add it to your html's body element:

```
d3.select('body').call(tooltip);
```

To show/hide your tooltip add the following code to your objects:

```
obj.on('mouseover', function(){
    //Getting the data from the object
    var o = d3.select(this);
    var d = o.datum();

    //Set content of tooltip
    tooltip.content("<strong>"+Math.round(d.x)+"px / "+Math.round(d.y)+"px</strong><br />Really nice Tooltip.");

    //This uses the center of the object for tooltip placement
    tooltip.positionFromObj(o);

    tooltip.show();
})
.on('mouseout', function(){
    tooltip.hide();
});
```

The above code sets the tips tooltip onto the center of your object if you want a custom offset (e.g. show tooltip at the upper left of your object instead of center). Just set the x/y coordinates directly:

```
tooltip.position([x,y]);
```

## Note

If the tooltips gets placed too close to the left or right of the page the tooltip automatically aligns itself to the left/right to fit onto the page. Be aware that you need at least 10px from the window border to properly show the tooltip.

If you change the arrow size of the tooltip you need to update the offset.x/offset.y of the tooltip, so that the position gets calculated correctly.
