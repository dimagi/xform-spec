---
title: Media
---

The `<itext>` method described in the [languages](#languages) section can also be used for **media labels**. Media labels can be used in addition to text labels or instead of text labels. 

{% highlight xml %}
....
<itext> 
    <translation default=true() lang="English">
        <text id="/widgets/select_widgets/grid_test/b:label">
            <value form="image">jr://images/b.jpg</value>
        </text>
        <text id="/widgets/display_widgets/text_media:label">
            <value form="audio">jr://audio/goldeneagle.mp3</value>
            <value>You can add a sound recording.</value>
        </text>
    </translation>
</itext>
...
{% endhighlight %}

### Supported Media Types

The following table shows the supported media types, and their corresponding itext `form` attribute values. The value of a media reference is a special URL similar to [external secondary instances] with prefixes or 'connectors' that will inform the client application where to download the resource.

| media type| form attribute | URL prefix
|-----------|----------------|----------------
| image     | `image`        | `jr://images`
| audio     | `audio`        | `jr://audio`
| video     | `video`        | `jr://video`
| big-image | `image`        | `jr://images`


By default, itext "image" values are not clickable. However, if you also include a "big-image", the image displayed by "image" will be clickable and will display a pannable, zoomable view of the file specified by "big-image". The user interface must provide a way to go back to the form after opening a "big-image". Specifying "big-image" alone has no effect, you must always include "image".

Files referenced by "image" and "big-image" may be the same; however, for performance reasons, it is recommended to create smaller thumbnail images to be referenced by "image".

[enketo](# "'big-image' is not supported in Enketo.")
