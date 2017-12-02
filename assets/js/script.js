$(function () {
  var progressBar = `<progress class="progress is-success" value="100" max="100"></progress>`;
  var attackBtn = `<a class="button is-small is-outlined is-danger attack">ATTACK!</a>`;
  var restartBtn = `<a class="button is-medium is-dark is-inverted is-outlined restart start">RESTART</a>`;
  var pick = true;
  var powerUp = 5;
  var powerGain = 0;
  var gameOver = false;
  var myLife, enemyLife, myAttack, enemyAttack;
  var fighters = {
    kim: {
      attack: 10,
      hp: 130
    },
    mike: {
      attack: 20,
      hp: 100
    },
    pepe: {
      attack: 15,
      hp: 150
    }
  };

  $('.pick').each((i) => {
    var id = $('.pick')[i].id;
    $(`#${id} .power`).html(fighters[id].hp)
  });

  $('.pick').on('click', (event) => {
    if (pick) {
      var id = event.currentTarget.id;
      var myChar = $(`#${id}`);
      var enemies = $('.picks')[0];
      $('.my-char').css('display', 'block');
      $('.my-enemy').css('display', 'block');
      $('.char-pick').css('display', 'none');
      $('.my-pick').append(myChar);
      $(`#${id}`).removeClass('pick');
      $(`#${id} .message`).addClass('is-success');
      $('.enemies').append(enemies);
      $('.enemies .message').addClass('is-danger');
      pick = false;
      $('.enemies .pick').on('click', (event) => {
        $('.my-fight').css('display', 'block');
        var id = event.currentTarget.id;
        var myEnemy = $(`#${id}`);
        $('.fight').append(myEnemy);
        $('.enemies-title').html('Enemies Remaining');
      })
    }
  });

  $('.start').on('click', () => {
    $('.my-pick .message-footer').append(attackBtn);
    $('.my-pick .column, .fight .column').prepend(progressBar);
    var myId = $('.my-pick .column').attr('id');
    var enemyId = $('.fight .column').attr('id');
    myLife = fighters[myId].hp;
    enemyLife = fighters[enemyId].hp;
    myAttack = fighters[myId].attack;
    enemyAttack = fighters[enemyId].attack;
    $('.attack').on('click', () => {
      var myId = $('.my-pick .column').attr('id');
      var enemyId = $('.fight .column').attr('id');
      attack(myId, enemyId);
    });
    $('.start').css('display', 'none');
  });

  function attack(me, enemy) {
    if (!gameOver) {
      enemyLife -= myAttack + powerGain;
      $(`#${enemy} progress`).attr('value', Math.floor((enemyLife / fighters[enemy].hp) * 100));
      $('.fight .power').html(enemyLife);
      if (enemyLife <= 0) {
        if (!$('.enemies .columns .column')[0]) {
          alert('YOU WIN!');
          gameOver = true;
          $('.my-char .title').append(restartBtn);
          $('.restart').on('click', () => {
            location.reload();
          });
        } else {
          $(`#${enemy}`).remove();
          var newEnemy = $('.enemies .columns .column')[0].id;
          $('.fight').append($(`#${newEnemy}`));
          $(`#${newEnemy}`).prepend(progressBar);
          enemyLife = fighters[newEnemy].hp;
        }
      }
      myLife -= enemyAttack;
      $(`#${me} progress`).attr('value', Math.floor((myLife / fighters[me].hp) * 100));
      $('.my-pick .power').html(myLife);
      if (myLife <= 0) {
        alert('you lost');
        gameOver = true;
        $('.my-char .title').append(restartBtn);
        $('.restart').on('click', () => {
          location.reload()
        })
      }
      powerGain += powerUp;
    }
  }
});