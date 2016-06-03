function newGame(grid, nbsquare, score) {
    var x_random_init1 = 0;
    var y_random_init1 = 0;

    var x_random_init2 = 0;
    var y_random_init2 = 0;

    while (x_random_init2 === x_random_init1 && y_random_init1 === y_random_init2) {
        x_random_init1 = Math.floor(Math.random() * nbsquare);
        y_random_init1 = Math.floor(Math.random() * nbsquare);

        x_random_init2 = Math.floor(Math.random() * nbsquare);
        y_random_init2 = Math.floor(Math.random() * nbsquare);
    }

    var nb = Math.floor(Math.random() * 3);

    if (nb === 2) {
        grid[x_random_init1][y_random_init1].innerHTML = 4;
    } else {
        grid[x_random_init1][y_random_init1].innerHTML = 2;
    }
    grid[x_random_init1][y_random_init1].className = "square deux";

    grid[x_random_init2][y_random_init2].innerHTML = 2;
    grid[x_random_init2][y_random_init2].className = "square deux";

    $('#result').html('0');
    score = 0;
    localStorage.setItem('score', '0');
}

function addRandomBox(grid, nbsquare) {
    x_random = Math.floor(Math.random() * nbsquare);
    y_random = Math.floor(Math.random() * nbsquare);

    if (grid[x_random][y_random].innerHTML == '') {
        grid[x_random][y_random].innerHTML = 2;
        grid[x_random][y_random].className = 'square deux';
    } else {
        addRandomBox(grid, nbsquare);
    }
}

function fillEmpty(line, dir) {
    var tabFilled = [];
    if (dir === 1) {
        var i;
        for (i = 0; i < line.length; i += 1) {
            if (line[i].innerHTML !== '') {
                tabFilled.push(line[i].innerHTML);
            } else {
                tabFilled.unshift(line[i].innerHTML);
            }
        }
    } else if (dir === -1) {
        var i;
        for (i = line.length - 1; i >= 0; i -= 1) {
            if (line[i].innerHTML !== '') {
                tabFilled.unshift(line[i].innerHTML);
            } else {
                tabFilled.push(line[i].innerHTML);
            }
        }
    }
    return tabFilled;
}

function move(grid, dir) {
    var i;
    for (i = 0; i < grid.length; i += 1) {
        line = fillEmpty(grid[i], dir);
        var j;
        for (j = 0; j < grid.length; j += 1) {
            grid[i][j].innerHTML = line[j];
        }
    }
}

function changeLinesValue(grid, dir, score) {
    var line = [];
    move(grid, dir);

    //CHANGE VALUES
    if (dir === 1) {
        var i;
        for (i = 0; i < grid.length; i += 1) {
            var j;
            for (j = grid.length - 1; j >= 0; j -= 1) {
                if (j > 0 && grid[i][j].innerHTML === grid[i][j - 1].innerHTML && grid[i][j].innerHTML !== '') {
                    grid[i][j-1].innerHTML = parseInt(grid[i][j].innerHTML) + parseInt(grid[i][j-1].innerHTML);
                    score += parseInt(grid[i][j-1].innerHTML);
                    grid[i][j].innerHTML = "";
                    j--;
                }
            }
        }
    }
    else if (dir === -1) {
        var i;
        for (i = 0; i < grid.length; i += 1) {
            var j;
            for (j = 0; j < grid.length; j += 1) {
                if (j < grid.length - 1 && grid[i][j].innerHTML === grid[i][j + 1].innerHTML && grid[i][j].innerHTML !== '') {
                    grid[i][j+1].innerHTML = parseInt(grid[i][j].innerHTML) + parseInt(grid[i][j+1].innerHTML);
                    score += parseInt(grid[i][j+1].innerHTML);
                    grid[i][j].innerHTML = "";
                    j += 1;
                }
            }
        }
    }

    //SECOND MOVE AFTER CHANGES
    move(grid, dir);

    //ADD CLASS TO SQUARES
    var tab_class = {'' : "square", 2 : "square deux", 4 : "square quatre", 8 : "square huit", 16 : "square seize", 32 : "square tentedeux", 64 : "square soixantequatre", 128 : "square centvingthuit", 256 : "square deuxcentc", 512 : "square cinqcent", 1024 : "square mille", 20148 : "square deuxmille"};
    var i;
    for (i = 0; i < grid.length; i += 1) {
        var j;
        for (j = 0; j < grid.length; j += 1) {
            for (var k in tab_class) {
                if (grid[i][j].innerHTML == k)
                {
                    grid[i][j].className = tab_class[k];
                }
            }
        }
    }
    return score;
}

function lineToCols(grid) {
    var tab = [];
    var i;
    for (i = 0; i < grid.length; i += 1) {
        var tab2 = [];
        var j;
        for (j = 0; j < grid[i].length; j += 1) {
            tab2.push(grid[j][i]);
        }
        tab[i] = tab2;
    }
    return tab;
}

function checkWin(grid) {
    var i;
    for (i = 0; i < grid.length; i += 1) {
        var j;
        for (j = 0; j < grid[i].length; j += 1) {
            if (grid[i][j].innerHTML === 2048) {
                document.getElementById('win').style.display = 'block';
            }
        }
    }
}

function checkEmpty(grid) {
    var i;
    for (i = 0; i < grid.length; i += 1) {
        var j;
        for (j = 0; j < grid[i].length; j += 1) {
            if (grid[i][j].innerHTML === "") {
                return false;
            }
        }
    }
    return true;
}

function checkLoose(grid) {
    if (checkEmpty(grid)) {
        var count = 0;
        var i;
        for (i = 0; i < grid.length; i += 1) {
            var j;
            for (j = 0; j < grid[i].length; j += 1) {
                if (j !== grid.length - 1 && grid[i][j].innerHTML === grid[i][j+1].innerHTML) {
                    count++;
                }
            }
        }
        var i;
        for (i = 0; i < grid.length; i += 1) {
            var j;
            for (j = 0; j < grid[i].length; j += 1) {
                if (j !== grid.length - 1 && grid[j][i].innerHTML === grid[j+1][i].innerHTML) {
                    count++;
                }
            }
        }

        if (count === 0) {
            document.getElementById('loose').style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {

    if (!localStorage.getItem('logins')) {
        localStorage.setItem('logins', '[]');
    }
    //RED ARROW TO START THE GAME
    $('#arrow').fadeOut(400);
    $('#arrow').fadeIn(400);
    $('#arrow').fadeOut(400);
    $('#arrow').fadeIn(400);
    $('#arrow').fadeOut(400);

    //DISPLAY 10 BEST SCORES
    var tab_score = [];
    var count = 0;
    for(var i in localStorage) {
        if (i === 'logins') {
            tab_score = JSON.parse(localStorage[i]);
        }
    }
    if (tab_score.length !== 0) {
        var i;
        for (i = tab_score.length - 1; i >= 0; i -= 1) {
            $('#score_table').append('<tr></tr>');
            $('#score_table tr:last-child').append('<td></td>');
            $('#score_table tr:last-child td').html(tab_score[i][0]);
            $('#score_table tr:last-child').append('<td></td>');
            $('#score_table tr:last-child td:last-child').html(tab_score[i][1]);
        }
    }

    // SAVE SCORE IN LOCALSTORAGE
    document.getElementById('scores_save').addEventListener('click', function () {
        var logScores = JSON.parse(localStorage.getItem('logins'));
        logScores.push([$('input[type=text]').val(), $('#result').html()]);
        localStorage.setItem('logins', JSON.stringify(logScores));
    });

    //COLOR BUTTON WITH RIGHT SIZE
    if (localStorage.getItem('size') !== "") {
        var i;
        for (i = 0; i < 3; i += 1) {
            var nb = document.children[0].children[1].children[0].children[0].children[i];
            if (parseInt(nb.innerHTML) === parseInt(localStorage.getItem('size'))) {
                var nb2 = document.getElementById(localStorage.getItem('size'));
                nb2.style.border = '2px solid red';
            }
        }
    }

    $('.size').click(function() {
        document.getElementById('loose').style.display = 'none';
        document.getElementById('win').style.display = 'none';
        var cadre = document.getElementById('cadre');
        var nbsquare = parseInt($(this).html());
        var grid=[];
        var dir = 0;
        var size = nbsquare * 130 + 6 * nbsquare;
        var score = 0;
        document.getElementById('result').innerHTML = score;
        $('#cadre').width(size);
        $('#loose').width(size);
        $('#loose').height(size);
        $('.size').css({"border-color": "black",
             "border-width":"1px",
             "border-style":"solid"});

        //DISPLAY GAME
        $('.line').remove();
        $('#cadre').width(size);
        if (!localStorage.getItem('game')) {
            var i;
            for (i = 0; i < parseInt(nbsquare); i += 1) {
                $('#cadre').append('<div class="line"></div>');
                var j;
                for (j = 0; j < parseInt(nbsquare); j += 1) {
                    $('.line:last-child').append('<div class="square"></div>');
                }
            }
        } else if (localStorage.getItem('size') == parseInt($(this).html()) || localStorage.getItem('score') == 0) {
            score = parseInt(localStorage.getItem('score'));
            $('#cadre').html(localStorage.getItem('game'));
            $('#result').html(localStorage.getItem('score'));
        } else {
            localStorage.setItem('game', "");
            localStorage.setItem('score', "");
            score = 0;
            var i;
            for (i = 0; i < parseInt(nbsquare); i += 1) {
                $('#cadre').append('<div class="line"></div>');
                var j;
                for (j = 0; j < parseInt(nbsquare); j += 1) {
                    $('.line:last-child').append('<div class="square"></div>');
                }
            }
        }

        //SET VALUES IN GRID
        var i;
        for (i = 0; i < nbsquare; i += 1) {
            var line = [];
            var j;
            for (j = 0; j < nbsquare; j += 1) {
                line.push(cadre.children[i].children[j]);
            }
            grid[i] = line;
        }
        if (!localStorage.getItem('game')) {
            newGame(grid, nbsquare, score);
        }
        checkWin(grid);

        document.addEventListener('keydown', function(event) {
            if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40) {
                var noMove = $('#cadre').html();

                if (event.which === 37) {
                    dir = -1;
                    score = changeLinesValue(grid, dir, score);
                } else if (event.which === 39) {
                    dir = 1;
                    score = changeLinesValue(grid, dir, score);
                } else if (event.which === 40) {
                    dir = 1;
                    grid = lineToCols(grid);
                    score = changeLinesValue(grid, dir, score);
                    grid = lineToCols(grid);
                } else if (event.which === 38) {
                    dir = -1;
                    grid = lineToCols(grid);
                    score = changeLinesValue(grid, dir, score);
                    grid = lineToCols(grid);
                }

                if (noMove !== $('#cadre').html()) {
                    addRandomBox(grid, nbsquare);
                }
                localStorage.setItem('game', $('#cadre').html());
                localStorage.setItem('score', score);
                localStorage.setItem('size', nbsquare);
                checkLoose(grid);
            }
            document.getElementById('result').innerHTML = score;
        });

        document.getElementById('new_game').addEventListener('click', function () {
            document.getElementById('loose').style.display = 'none';
            document.getElementById('win').style.display = 'none';
            score = 0;
            localStorage.setItem('game', "");
            localStorage.setItem('size', "");
            var i;
            for (i = 0; i < grid.length; i += 1) {
                var j;
                for (j = 0; j < grid.length; j += 1) {
                    grid[i][j].innerHTML = '';
                    grid[i][j].className = "square";
                }
            }
            newGame(grid, nbsquare, score);
        });
    });
});