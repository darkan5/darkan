<?php $__env->startSection('title'); ?>
    <?php echo e(Lang::get('login.title_login')); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('description'); ?>
    <?php echo e(Lang::get('login.description_login')); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>

<link href="<?php echo e(asset('/css/login.css')); ?>" rel="stylesheet">

<div class="topmenu-offset"></div>

<h3 class="text-center"><?php echo e(Lang::get('login.description_login')); ?></h3>

<section id="login">
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading"><?=Lang::get('login.loginForm')?></div>
                <div class="panel-body">


                    <div class="col-md-3 social-buttons-container">
                        <div class="social-continer">
                            <div class="social-button fblogin">
                                <a href="<?php echo e(url('/login/facebook')); ?>">
                                    <span><?=Lang::get('login.loginWith_FB')?></span>
                                </a>
                            </div>
                            <div class="social-button gplogin">
                                <a href="<?php echo e(url('/login/google')); ?>">
                                    <span><?=Lang::get('login.loginWith_GP')?></span>
                                </a>
                            </div>
                            <div class="social-button inlogin">
                                <a href="<?php echo e(url('/login/linkedin')); ?>">
                                    <span><?=Lang::get('login.loginWith_IN')?></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">

                        <form class="form-horizontal" role="form" method="POST" action="<?php echo e(url('/login')); ?>">
                            <?php echo e(csrf_field()); ?>


                            <div class="form-group<?php echo e($errors->has('email') ? ' has-error' : ''); ?>">
                                <label for="email" class="col-md-2 control-label"><?=Lang::get('login.emailAddress')?></label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="email-addon"><i class="fa fa-envelope"></i></span>
                                    <input id="email" type="email" class="form-control" name="email" value="<?php echo e(old('email')); ?>" required autofocus>

                                    <?php if($errors->has('email')): ?>
                                        <span class="help-block">
                                            <strong><?php echo e($errors->first('email')); ?></strong>
                                        </span>
                                    <?php endif; ?>
                                </div>
                            </div>

                            <div class="form-group<?php echo e($errors->has('password') ? ' has-error' : ''); ?>">

                                <label for="password" class="col-md-2 control-label"><?=Lang::get('login.password')?></label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="password-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
                                    <input id="password" type="password" class="form-control" name="password" required>

                                    <?php if($errors->has('password')): ?>
                                        <span class="help-block">
                                            <strong><?php echo e($errors->first('password')); ?></strong>
                                        </span>
                                    <?php endif; ?>
                                </div>
                            </div>

                            

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-2">
                                    <button type="submit" class="btn btn-primary">
                                        <?=Lang::get('login.loginBtn')?>
                                    </button>

                                    <label>
                                        <input type="checkbox" name="remember"> <?=Lang::get('login.loginRemmber')?>
                                    </label>

                                </div>
                            </div>

                             <div class="form-group">
                                <div class="col-md-8 col-md-offset-2">

                                    <a class="btn btn-link" href="<?php echo e(url('/password/reset')); ?>">
                                        <?=Lang::get('login.forgetPassword')?>
                                    </a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>