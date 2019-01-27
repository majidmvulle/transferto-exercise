<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Calculation;
use App\Form\SingleValueFormType;
use App\Form\TwoValuesFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiController.
 *
 * @Route("/api")
 *
 * @author Majid Mvulle <majid@majidmvulle.com>
 */
class ApiController extends AbstractController
{
    /**
     * @Route("/addition", methods={"POST"})
     */
    public function addition(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TwoValuesFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();

            $firstValue = $data['firstValue'];
            $secondValue = $data['secondValue'];

            $result = $firstValue + $secondValue;

            return new JsonResponse($this->saveCalculation(sprintf('%s + %s', $firstValue, $secondValue), $result, $entityManager));
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/subtraction", methods={"POST"})
     */
    public function subtraction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TwoValuesFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $firstValue = $data['firstValue'];
            $secondValue = $data['secondValue'];

            $result = $firstValue - $secondValue;

            return new JsonResponse($this->saveCalculation(sprintf('%s - %s', $firstValue, $secondValue), $result, $entityManager));
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/division", methods={"POST"})
     */
    public function division(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TwoValuesFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $firstValue = $data['firstValue'];
            $secondValue = $data['secondValue'];

            if(!$secondValue){
                throw new HttpException(Response::HTTP_BAD_REQUEST, 'Unable to perform operation');
            }

            $result = $firstValue / $secondValue;

            return new JsonResponse($this->saveCalculation(sprintf('%s ÷ %s', $firstValue, $secondValue), $result, $entityManager));
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/multiplication", methods={"POST"})
     */
    public function multiplication(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TwoValuesFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $firstValue = $data['firstValue'];
            $secondValue = $data['secondValue'];

            $result = $firstValue * $secondValue;

            return new JsonResponse($this->saveCalculation(sprintf('%s x %s', $firstValue, $secondValue), $result, $entityManager));
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/percentage", methods={"POST"})
     */
    public function percentage(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(SingleValueFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $firstValue = $data['firstValue'];

            $result = $firstValue / 100;

            return new JsonResponse($this->saveCalculation(sprintf('%s%%', $firstValue), $result, $entityManager));
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/factorial", methods={"POST"})
     */
    public function factorial(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(SingleValueFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $originalValue = $data['firstValue'];
            $firstValue = $data['firstValue'];
            $result = $firstValue;

            while ($firstValue > 1) {
                $result = $result * ($firstValue - 1);
                $firstValue--;
            }

            return new JsonResponse($this->saveCalculation(sprintf('%s!', $originalValue), $result, $entityManager));
        }
        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/square_root", methods={"POST"})
     */
    public function squareRoot(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(SingleValueFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $firstValue = $data['firstValue'];

            $result = sqrt($firstValue);

            return new JsonResponse($this->saveCalculation(sprintf('√%s', $firstValue), $result, $entityManager));
        }
        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/cubic_root", methods={"POST"})
     */
    public function cubicRoot(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(SingleValueFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();
            $firstValue = $data['firstValue'];
            $result = pow($firstValue, 1/3);

            return new JsonResponse($this->saveCalculation(sprintf('∛%s', $firstValue), $result, $entityManager));
        }
        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/power", methods={"POST"})
     */
    public function power(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TwoValuesFormType::class, []);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $data = $form->getData();

            $firstValue = $data['firstValue'];
            $secondValue = $data['secondValue'];

            $result = pow($firstValue, $secondValue);

            return new JsonResponse($this->saveCalculation(sprintf('%s ^ %s', $firstValue, $secondValue), $result, $entityManager));
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function saveCalculation($expression, $result, EntityManagerInterface $entityManager): Calculation
    {
        $calculation = new Calculation($expression, $result);
        $entityManager->persist($calculation);
        $entityManager->flush();

        return $calculation;
    }
}
