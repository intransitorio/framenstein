find bower_components -name *.css | sed 's/^\(.*\)\.css$/cp "\1.css" "\1_css.scss"/' | sh